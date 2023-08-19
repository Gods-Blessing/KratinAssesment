import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {io} from 'socket.io-client'

const SocketContext = createContext(null);

export const useSocket = ()=>{
    const socket = useContext(SocketContext);
    return socket;
}
// const socket: any = io('localhost:3000');

export const SocketProvider = ({children}:any)=>{
    const socket: any = useMemo(()=> io('localhost:3000'), []);

    
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}