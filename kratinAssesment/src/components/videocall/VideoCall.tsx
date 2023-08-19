import { useCallback, useState, useEffect } from 'react'
import './VideoCall.css'
import {useNavigate} from 'react-router-dom'
import { useSocket } from '../../Context/SocketProvider';

export default function VideoCall(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [roomid, setRoomId] = useState('');
    const socket: any = useSocket();


    const handleSubmit = useCallback((e: any)=>{
        e.preventDefault();
        socket.emit("room:join", {email, roomid});
        // console.log(email ," --", roomid);
    }, [email, roomid, socket])

    const handleRoomJoin =useCallback((data:any)=>{
        const {roomid}:any = data;
        // console.log(email, 'and', roomid);
        navigate(`/room/${roomid}`);
    }, [navigate]);

    useEffect(()=>{
       socket.on('room:join', handleRoomJoin);

       return ()=>{
        socket.off('room:join', handleRoomJoin)
       }
    
    }, [socket])

    return (
        <section className='video-container'>
            {/* <video id='video-call' src=""></video>
            <div>Heyy</div> */}
            <form action="" onSubmit={handleSubmit}>
            <h1>Join Room</h1>
                <label htmlFor="email">Email: </label>
                <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                
                <br />

                <label htmlFor="roomid">Room Id: </label>
                <input type="text" value={roomid} onChange={(e)=> setRoomId(e.target.value)}/>

                <button className='joining-btn'>Join</button>
            </form>
        </section>
    )
}