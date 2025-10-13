import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupLabel
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"


// pass chats array, and each chat has an ID



const SideBar = ({ chats, userId }) => {
    return (
        <SidebarProvider>
            <SidebarTrigger />
            <div className="flex flex-1 overflow-hidden flex-col">
            <Sidebar className = 'hidden md:block w-64 '>
                <SidebarHeader>
                    <SidebarGroupLabel className='flex items-center text-4xl p-2'>
                        Application
                    </SidebarGroupLabel>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className='flex flex-col gap-5 overflow-scroll'>
                    {
                    (chats.length == 0)?<div className="flex">Get started by adding someone!</div>:
                    chats.map((chat)=>(
                        <Link to={`/${userId}/${chat.id}`} className="flex flex-col items-left text-2xl px-3" key = {chat.name}>
                            <h1>{chat.name}</h1>
                            <span className="text-xs">{chat.latestmsg}</span>
                        </Link>
                    )
                    )
                    }
                    </SidebarGroup>
                </SidebarContent>
                
                <SidebarFooter>
                    Personal project<br></br>
                    All rights reserved
                </SidebarFooter>
            </Sidebar>
            </div>
            </SidebarProvider>
        
    )
}

export default SideBar;