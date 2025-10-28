import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { use, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";


const socket = io("http://localhost:3000");

const Friends = () => {
    const {user} = useContext(AuthContext);

    const id = user._id;
    const [value,setValue] = useState("");
    const [incoming,setIncoming] = useState([]);
    const [friends,setFriends] = useState([]);

    //incoming friend requests, two arrays confirmed and pending
    if(!user)console.log("No user in Friends component");
    useEffect(()=>{
        let ignore  = false;
        const fetchIncomingRequests = async () => {
            
            const res = await fetch(`http://localhost:3000/users/${id}/friends`);
            const data = await res.json();
            const pending = data.requests;
            const confirmed = data.confirmed;
            setIncoming(pending);   
            setFriends(confirmed);
        };
        fetchIncomingRequests();
        return (()=> ignore = true);
    }, []);
    //fetch your friends

    socket.on("connect", () => {
        console.log("Connected to socket server");
    });

    const handleAccept = (friendUsername) => async (e) => {
        e.preventDefault();
        setValue("");
        setIncoming((prev)=> prev.filter((req)=> req.sender.username !== friendUsername));
        setFriends((prev)=> [...prev, {username:friendUsername}]);
        const res = await fetch(`http://localhost:3000/users/accept?send=${friendUsername}&rec=${user.username}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await res.json();
        console.log("Response from server:", data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3000/users?send=${user.username}&rec=${value}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await res.json();
        console.log("Response from server:", data);
    }
    return (
        <div className="flex flex-col items-center justify-between my-5 md:my-15 w-full">
        <div className="bg-gray-500 h-auto md:h-1/2 w-full md:w-1/4 rounded-3xl flex flex-col items-center justify-around p-4 sm:p-6 md:p-10 gap-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold ">Add friends!</div>
                <ul>
                    {value}
                </ul>
                <form>
                    <label className="flex w-full items-center gap-2">
                    <Input type = "text" placeholder="Get new friends!" className = 'bg-black w-full flex-1' value = {value} onChange ={(e)=>{setValue(e.target.value)}}/>
                    <Button className='shrink-0' onClick ={handleSubmit}>Send</Button>
                    </label>
                </form>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-4 sm:px-6 md:px-8 gap-6 md:gap-10">
            <div className="flex md:flex-col items-center text-sm md:text-3xl bg-gray-500 h-auto md:h-3/4 w-full md:w-1/4 rounded-3xl p-4 sm:p-6 md:p-10 gap-4 md:gap-6">
                <div className="font-bold text-xl sm:text-2xl md:text-3xl">Friends Requests</div>
                <div className="flex flex-col gap-2 md:gap-4 max-h-60 md:max-h-full overflow-scroll">
                    {incoming.length == 0?<div>None</div>:
                    incoming.map((person)=>{
                        console.log(person);    
                        return (
                            <div className="flex justify-between gap-10" key={person.index}>
                                <div>{person.sender.username}</div>
                                <Button onClick={handleAccept(person.sender.username)}>Accept</Button>
                            </div>
                        )
                    })
                }
                </div>
            </div>

            
        
                <div className="bg-gray-500 h-auto md:h-3/4 w-full md:w-1/4 rounded-3xl flex flex-col items-center p-4 sm:p-6 md:p-10 gap-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold ">Your Friends</div>
                    <div className="flex flex-col gap-2 md:gap-4 max-h-60 md:max-h-full overflow-scroll text-3xl"> 
                        {friends.length === 0 ? (
                            <div>No friends haha</div>
                        ) : (
                            friends.map((friend) => (
                                <div key={friend.index} className="flex items-center justify-between gap-20">
                                    <span>{friend.sender.username === user.username ? friend.receiver.username : friend.sender.username}</span>
                                    <Button><Link to={`/chats/`}>Chat</Link></Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
        
        </div>
        </div>
    )
}

export default Friends