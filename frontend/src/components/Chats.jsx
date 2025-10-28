import SideBar from "./Sidebar"
import {SidebarTrigger}  from "@/components/ui/sidebar"
import { useContext, useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import Chat from "./Chat"; 


const chats = [
    {
        name:"alwin 1",
        latestmsg:"sup nig",
    },
    {
        name:"alwin 2",
        latestmsg:"hey"
    },
    
]

  
const Chats = () => {
        const context = useContext(AuthContext);
        const {user} = context || {};
        const Params = useParams();
        const {  id } = Params; // the room
        const apiUrl = `http://localhost:3000/chats/${user._id}`;
        const [Chats,setChats] = useState([]); // array of chat objects
        const [success,setSuccess] = useState(false);
        const [current,setCurrent] = useState([]);

        useEffect(
             () =>{
              const fetchData = async () => {  
                try{
                    const res = await fetch(apiUrl); // we are fetching an array of chats
                    console.log(res);
                    if(res.ok){
                        const data = await res.json();
                        const chats = data.chats;
                        setChats(chats);
                        setSuccess(true);
                        
                    }else {
                        console.log("error");
                        const err = new Error("failed to fetch chats!");
                        throw err;
                    }
                    
                }catch(err){
                    setSuccess(false);
                }
              }
              
              fetchData();
            }    
            ,
            []);
        //passing chats
        return(
            <div className='flex'>
            {success?<><SideBar collapsible="offcanvas | icon | none" className = "cursor:pointer" chats={Chats} userId={id} /><Chat chats = {Chats}  /></>:<div className="w-full h-screen text-6xl">There was an error loading chats</div>}
            </div>
        )
}

export default Chats