const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
var cors = require('cors')
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
      origin: "https://kratin-assesment-fe.vercel.app/",
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res)=>{
    res.end("heyy");
    // return;
})


io.on('connection', (socket)=>{
    console.log("User connected -", socket.id );
    socket.on("room:join", (data)=>{
        console.log(data.email, " --", data.roomid )

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







server.listen(port, (err)=>{
    if(err){
        console.log("error while starting the server");
        return
    }

    console.log("server started on port: ", port);
})