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
    socket.on("chat:send",(message)=>{
        console.log("New Message received from ",socket.id,"with message:",message);
        io.emit("chat:new", { text: message, id: socket.id });
    })

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