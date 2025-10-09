import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connect_db from './database/mongodb.js';
import authRouter from './src/routes/auth.js';
import userRouter from './src/routes/users.js';
import errorMiddleware from './middlewares/error.middlewares.js'; 
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import Message from './database/messageschema.js'
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.SOCKET_CORS_ORIGIN || "*",
        methods: ["GET", "POST"]
    }
});
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/auth',authRouter);
app.use('/',userRouter);
app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;

app.get("/", (request,response)=>{
    response.send("hello world");
})

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    //when someone joins a new group
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
        socket.to(room).emit('user_joined', { userId: socket.id, room });
        
    });
    
    //someone sends a message
    socket.on('send_message', async (data) => {
        console.log('Message received:', data);
        const {user,message,room} = data; // incoming message has a user, content, and the group
        const newMsg = await Message.create({
            sentBy: user, 
            text: message, 
            sentTo: [room]
        });
        socket.to(data.room).emit('receive_message', newMsg);
    });
    
    // when someone in the grp is typing
    socket.on('typing', (data) => {
        socket.to(data.room).emit('user_typing', {
            userId: socket.id,
            isTyping: data.isTyping
        });
    });
    //we can try to check if an user is online
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
    
});

server.listen(PORT, async ()=>{
    console.log(`Server listening on PORT ${PORT}`);
    console.log(`Socket.IO server running on http://localhost:${PORT}`);
    await connect_db();
})
