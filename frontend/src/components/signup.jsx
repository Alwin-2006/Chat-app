import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


const url = "http://localhost:3000/auth/signup"

  const signup = () => {
        const navigate = useNavigate();
        const signup = async (e) =>{
            console.log("signingup");
            e.preventDefault(); // vert important for handle submission 
            const res = await fetch((url),{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username,
                    email,
                    password,
                  })
            });
            if(res.ok){
            const data = await res.json();
            localStorage.setItem("token",data.token);
            const id = data.username;
            navigate(`/chats/${id}`);
            }else console.log(res.error);
        }
        const [username,setUsername] = useState("");
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        console.log(username);
        return(
            <div className="flex items-center justify-center h-full">
            <Card className = 'w-full max-w-sm'>
                <CardHeader className ='flex items-baseline'>
                    <span className="text-3xl font-bold">SIGN UP </span>AND GET STARTED!
                </CardHeader>
                <CardContent className="flex flex-col justify-around gap-10">
                    <form onSubmit={signup} className="flex flex-col justify-around gap-5">
                        <label className="flex flex-col gap-2">
                            Username:
                            <Input type = "text" placeholder = "Enter a username" onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label className="flex flex-col gap-2">
                            Email:
                            <Input type = "text" placeholder = "Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="flex flex-col gap-2">
                            Password:
                            <Input type = "password" placeholder = "Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </form>
                    <button type = "submit" className = 'flex justify-center items-center hover:cursor-pointer' onClick = {signup}>SIGN UP</button>
                </CardContent>
            </Card>
            </div>
        )
  }


export default signup