import React, { useState } from 'react'


const Chat = ({chat})  => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [room,setRoom] = useState(null);

    return (
        <div className="w-full flex flex-col h-screen">
            {
            room == null ? (<div></div>):(
            <>
            <div className=" p-4 text-white text-2xl font-bold flex items-center justify-center">Chat Room</div>  
                <div className='h-3/4 flex justify-center overflow-scroll p-4 md:p-10' >
                    {
                    messages.length === 0 ? <div className='self-center text-xl md:text-5xl'>Send your first message to {room}!</div>:
                    messages.map((msg, index) => 
                        <div>
                        </div>

                    )                      
                }
                </div>
            <form className="flex justify-between px-2">
                <input type="text" placeholder="Type your message..." className="border p-2 rounded-xl w-3/4 md:w-8/9 border-white" onChange={(e) => setMessage(e.target.value)} />
                <button type="submit" className="bg-white text-black p-2 rounded-xl ml-2 w-1/4 md:1/9">Send</button>
            </form>
            </>
            )
            }
        
        </div>
    )
}

export default Chat