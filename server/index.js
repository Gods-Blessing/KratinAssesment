// const express = require('express');
// const app = express();
// const port = 3000;
// const http = require('http');
// const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(3000, {cors: true});


// app.get('/', (req, res)=>{
//     res.end("heyy");
//     return;
// })


io.on('connection', (socket)=>{
    console.log("User connected -", socket.id );
    socket.on("room:join", (data)=>{
        // console.log(data.email, " --", data.roomid )

        io.to(data.roomid).emit('user:joined', { email: data.email, id: socket.id});
        
        socket.join(data.roomid);
        io.to(socket.id).emit("room:join",data)
    });

    socket.on('user:call', ({to, offer})=>{
        io.to(to).emit('incomming:call', {from: socket.id, offer: offer});
    })
    
    socket.on('call:accepted', ({to, ans})=>{
        io.to(to).emit('call:accepted', {from: socket.id, ans});
    })

    socket.on('peer:nego:needed', ({to, offer})=>{
        io.to(to).emit('peer:nego:needed', {from: socket.id, offer});
    });

    socket.on('peer:nego:done', ({to, ans})=>{
        io.to(to).emit('peer:nego:final', {from: socket.id, ans});
    })
})







// app.listen(port, (err)=>{
//     if(err){
//         console.log("error while starting the server");
//         return
//     }

//     console.log("server started on port: ", port);
// })