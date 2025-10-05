import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Chats from "./components/Chats.jsx"
import {SidebarProvider} from '@/components/ui/sidebar'
import Login from './components/login'
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom'


const url = `http://localhost:5173/`;

function App() {
  const navigate = useNavigate();
    const [authenticated,isAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false); // set it true later
    const [user,setUser] = useState(null);
    //useeffect for authentication
    useEffect(()=> {
      const authCheck = async () => {
        const access = localStorage.getItem("accesstoken");
        const refresh = localStorage.getItem("refreshtoken");
        if(!access || !refresh)isAuthenticated(false); // access token doesnt exist, redirect into Login page
        else {
          const res = await fetch(url,{
            headers:{Authorization:`Bearer ${access}`}
          });
          if(res.ok){
            isAuthenticated = true;
        }else if(res.status === 401 || res.status === 403) {
          const refreshtoken  = await fetch(url,{
            method:'POST',
            headers:{ "Content-Token":"application/json"},
            body: JSON.stringify({refresh})
        });
        }else {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          isAuthenticated(false);
        }
        if(authenticated){
          const user = await res.json();
        }
        }
      }
    },[]) 
    console.log(authenticated);
    if(loading){
      return <div className='flex items-center justify-center h-screen text-5xl'> <div className='flex self-center'>Loading...</div></div>
    }
      else if(authenticated){ return (
        <>
            <div className="h-screen flex flex-col">
              <div className='pt-14'>
                <SidebarProvider>
                <Chats />
                </SidebarProvider>
              </div>
             
              
          </div>
        </>
      )
    }else return <Navigate to='/login' replace />
}

export default App
