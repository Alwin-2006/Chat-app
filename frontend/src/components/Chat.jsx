import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

 //  /chats/sender/room
const Chat = ({chats})  => {
    const {user} = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState(null);
    const {id} = useParams();
    console.log("id is",id);
    /*useEffect(()=>{
        const fetchMessages = async () => {
            const res = await fetch(`http://localhost:3000/chats/${id}`);
            const data = await res.json();
            setMessages(data.messages);
            setRoom(data.room);
        }
        fetchMessages();
    }, [id]);*/
    const currChat = chats.find(chat => chat._id === id);
    console.log("Current chat is", currChat);
    useEffect(() => {
        if(!user || !id){
            return ;
        }
        socket.emit("join_room", currChat._id);
        socket.on("receive_message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
         const fetchMessages = async () => {
            const res = await fetch(`http://localhost:3000/chats/chat/${currChat._id}`);
            console.log("currchat",currChat._id);
            const data = await res.json();
            setMessages(data.messages);
            setRoom(data.room);
        }
            fetchMessages();
        return () => {
            socket.emit("leave_room", id);
            socket.off("receive_message");
        };
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(message.trim() === "") return;
        const newMessage = {text: message, sentBy: user._id,sentTo: currChat._id};
        socket.emit("send_message", {sentBy:user._id,sentTo:currChat._id,message:message}  );
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");

    }
    console.log("Messages are:",messages);


    console.log(chats);
    return (
        <div className="w-full flex flex-col h-screen">
            {
            (!id)? (<div></div>):(
            <>
            <div className=" p-4 text-white text-2xl font-bold flex items-center justify-center">{currChat.title? currChat.title:currChat.participants.find(p => p._id !== user._id ).username }</div>
                <div className='h-3/4 flex justify-center overflow-scroll md:p-10' >
                    {
                    messages.length === 0 ? <div className='self-center text-xl md:text-5xl'>Send your first message to {currChat.isGroup?<div></div>:currChat.participants.find(p => p._id !== user._id ).username}!</div>:
                    <div className='flex flex-col gap-4 text-xl md:text-4xl w-full overflow-scroll'>
                    {messages.map((msg, index) => 
                        <div key={index} className={`${msg.sentBy === user._id ? 'self-end ' : 'self-start'} flex flex-row items-center gap-5`}>
                            <div>{msg.sentBy != user._id ? <div>{currChat.participants.find(p => p._id ==msg.sentBy).username}:</div> : <></>}</div>
                        <div key={index} className={`bg-blue-500 ${msg.sentBy === user._id ? 'self-end bg-blue-900' : 'self-start'} rounded-xl p-4 w-fit max-w-lg`}>
                           {msg.text ? msg.text : msg}
                        </div>
                         {msg.sentBy === user._id ? <div>: {user.username}</div>: <></>}
                        </div>

                    )} 
                    </div>                     
                }
                </div>
            <form className="flex justify-between px-2" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Type your message..." className="border p-2 rounded-xl w-3/4 md:w-8/9 border-white" value= {message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit" className="bg-white text-black p-2 rounded-xl ml-2 w-1/4 md:1/9">Send</button>
            </form>
            </>
            )
            }
        
        </div>
    )
}

export default Chat