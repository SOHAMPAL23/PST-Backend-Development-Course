const express = require("express")
const http = require("http")
const {Server} = require("socket.io")

const app = express()

const server = http.createServer(app)

const io = new Server(server , {
    cors : {origin:"*"}
})

//Payload to send a message 
io.on('connection',(socket)=>{
    //connected client
    console.log("New client connected",socket.id);

    // sending message
    socket.on("room:join",()=>{
        socket.join("room");
        console.log(`Client with id : ${socket.id} have joined Room :  ${room}`);
        socket.emit("room:joined", { room });
        socket.to("room").emit("chat:new", {
            id: "SERVER",
            text: `New client with ID ${socket.id} have joined the room ${room}`
        });
    })

    //Socket message
    socket.on("chat:send", (room,message) => {
        if(!room|| !message) {
            return;
        }

        if(room.trim() === "" || message.trim() === "") {
            return;
        }

        console.log(`Client with id : ${socket.id} have sent message : ${message} in room : ${room}`);
        io.to(room).emit("chat:new", {
            id: socket.id,
            text: message
        });
    });

    //disconnecting the socket
    socket.on('disconnect',()=>{
        console.log("Client disconnected",socket.id);
    })
})


server.listen(5000 , ()=>{
    console.log("server running on PORT : 5000")
})

app.get("/health" , (req,res)=>{
    res.status(200).json({
        message : "Server is healthy"
    })
})