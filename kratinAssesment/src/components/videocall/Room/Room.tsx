import './Room.css'
import {useState, useEffect, useCallback} from 'react';
import { useSocket } from '../../../Context/SocketProvider';
import ReactPlayer from 'react-player';
// importing peer
import peer from '../../../services/Peer';
import { useNavigate } from 'react-router-dom';



export default function Room(){
    const navigate = useNavigate();
    const socket:any = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream]: any = useState();
    const [remoteStream, setRemoteStream] = useState();
    
    // handling the joining of user 
    const handleUserJoined = useCallback((data:any)=>{
        // console.log('user joined', data.email);
        setRemoteSocketId(data.id);
    }, [])

    // handling the calling to user
    const handleCallUser = useCallback(async()=>{
        const stream: any = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        const offer = await peer.getOffer();
        socket.emit('user:call', {to: remoteSocketId, offer});
        setMyStream(stream);
    }, [remoteSocketId, socket])

    // handling the incoming call 
    const handleIncommingCall = useCallback(async(data:any)=>{
        let {from, offer} = data;
        // console.log(`incoming call from ${from} offer is`, offer);
        setRemoteSocketId(from);
        const stream: any = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', {to: from, ans});
    },[socket]);

    // sending the stream
    const sendStreams = useCallback(()=>{
        for(const track of myStream.getTracks()){
            // console.log(track)
            peer.peer.addTrack(track, myStream)
        }
    },[myStream]);

    // handling the call acceptance by the other user
    const handleCallAccepted = useCallback( async({ans}: any)=>{    
        await  peer.setLocalDescription(ans);
        // console.log("call Accepted");
        sendStreams();
    }, [sendStreams]);

    // negotiation handled here
    const handleNegoNeeded = useCallback(async()=>{
        const offer = await peer.getOffer();
        // console.log("nego RUNS");
        socket.emit('peer:nego:needed', {to: remoteSocketId, offer});
    }, [remoteSocketId, socket]);

    // for handling all the events 
    useEffect(()=>{
        peer.peer.addEventListener('negotiationneeded',handleNegoNeeded );

        return ()=>{
            peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded );
        }
    }, [handleNegoNeeded])


    useEffect(()=>{
        peer.peer.addEventListener('track', async (ev:any)=>{
            const remoteStream = ev.streams;
            // console.log("GOT Tracks");
            
            setRemoteStream(remoteStream[0]);
        })
    }, [])

    const handleNegoIncomming = useCallback(async({from, offer}: any)=>{
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', {to: from, ans});
    }, [socket])

    const handleNegoFinal = useCallback(async({ans}:any)=>{
        await peer.setLocalDescription(ans);
    },[])

    // to stop the call
    const stopCall =()=>{
        // console.log("ended")
        navigate(0);
    }

    // for handling all the events 

    useEffect(()=>{
        socket.on('user:joined', handleUserJoined)
        socket.on('incomming:call', handleIncommingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoIncomming)
        socket.on('peer:nego:final', handleNegoFinal)

        return ()=>{
            socket.off('user:joined',handleUserJoined);
            socket.off('incomming:call', handleIncommingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoIncomming)
            socket.off('peer:nego:final', handleNegoFinal)
        }
    }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoFinal, handleNegoIncomming]);

    
    return(
        <div>
            <h1 className='heading-of-room'>Room</h1>
            <h4>Status: {remoteSocketId ? 'Connected' : 'No on in room'}</h4>

            <div className='btn-divs'>
                {remoteSocketId && <button className='btn' onClick={handleCallUser} disabled={remoteStream ? true: false}>Call</button>}

                {myStream && <button className='btn' onClick={sendStreams} disabled={remoteStream ? false: true}> Start Video Chat </button>}

                {remoteSocketId && <button className='btn' onClick={stopCall} disabled={remoteStream ? false: true}>End</button>}
            </div>
            <div className='mystream'>
            {myStream && (
                <div>
                    <h4>My Stream</h4>
                    <ReactPlayer height='200px' width='400px'  playing url={myStream}/>
                </div>
            )}

            {remoteStream && (
                <div>
                    {/* <h4>Remote stream</h4> */}
                    <ReactPlayer playing height="600px" width="700px" url={remoteStream}/>
                </div>
            )}

            </div>
            
        </div>
    )
}