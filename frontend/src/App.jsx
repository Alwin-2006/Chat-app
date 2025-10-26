import { useEffect, useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Chats from "./components/Chats.jsx"
import {SidebarProvider} from '@/components/ui/sidebar'
import Login from './components/login'
import { redirect, useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const url = `http://localhost:5173/`;


function App() {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  console.log(user);
  if(user){
    console.log("user exists");
    navigate(`/chats/${user._id}`);
  }
    return (
      <div className="h-screen flex flex-col justify-center gap-10 items-center">
              <h1 className='text-9xl font-bold'>
                CHATAPP
              </h1>
              <p className='text-4xl'>
                Get started with chatting today!
              </p>
      </div>
    )
  
   
}

export default App