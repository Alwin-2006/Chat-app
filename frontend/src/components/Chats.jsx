import SideBar from "./Sidebar"
import {SidebarTrigger}  from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
 
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
        const params = useParams(AuthContext);
        console.log("params");
        console.log(params);
        const { id } = params;
        const apiUrl = `http://localhost:3000/chats/${id}`;
        const [Chats,setChats] = useState([]);
        const [success,setSuccess] = useState(false);
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
        
        return(
            <div className='flex'>
            {success?<SideBar collapsible="offcanvas | icon | none" className = "cursor:pointer" chats={Chats} />:<div className="w-full h-screen text-6xl"></div>}
            </div>
        )
}

export default Chats