import SideBar from "./Sidebar"
import {SidebarTrigger}  from "@/components/ui/sidebar"
import {useParams} from 'react-router-dom'

 
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
        const params = useParams();
        console.log(params);
        return(
            
            <div className='flex'>
            <SideBar collapsible="offcanvas | icon | none" className = "cursor:pointer" chats={chats} />
            </div>
            
        )
}

export default Chats