import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Navbar from "@/components/navbar.jsx"

function App() {
  

  return (
    <>
     <div className="flex flex-col justify-between">
      <Navbar></Navbar>
    </div>
    </>
  )
}

export default App
