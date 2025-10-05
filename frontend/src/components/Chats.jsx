import SideBar from "./Sidebar"
import {SidebarTrigger}  from "@/components/ui/sidebar"
 
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
        return(
            
            <div className='flex'>
            <SideBar collapsible="offcanvas | icon | none" className = "cursor:pointer" chats={chats} />
            </div>
            
        )
}

export default Chats