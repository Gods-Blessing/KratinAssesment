import {createContext, useContext, useMemo} from 'react';
import {io} from 'socket.io-client'

const SocketContext = createContext(null);

export const useSocket = ()=>{
    const socket = useContext(SocketContext);
    return socket;
}
// const socket: any = io('localhost:3000');
console.log(import.meta.env.VITE_URL)

export const SocketProvider = ({children}:any)=>{
    const socket: any = useMemo(()=> io(import.meta.env.VITE_URL, {
        transports:['websocket', 'polling']
    }), []);

    
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}