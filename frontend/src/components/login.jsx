import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Link} from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

const url = "http://localhost:3000/"

const loginPage = () => {
    const [username, setUsername] =  useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [userFailed,setUserFailed] = useState(false);

    const handleLogin=async () => {
        const res = await fetch(url, {
            username:username,
            email:email,
            password:password
        })
        if(res.ok){

        }else {
            const msg = res.message;
            userFailed(true);
        }

    }
    return (
        <>  
            <div className="flex items-center justify-center">
            <Card className='w-full max-w-sm'>
                <CardHeader>
                    <CardTitle className = 'text-2xl font-bold'>
                        Login
                    </CardTitle>
                    <CardAction className = 'flex flex-col gap-2'>
                        No Account? Sign up here!
                        <Button variant="link">
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div>
                                <Label>Username</Label>
                                    <Input
                                     placeholder= "Enter username"
                                     onChange = {(e)=>setUsername(e.target.value)}
                                     />
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="somethingsomething@something.com"
                                required
                                onChange = {(e)=>setEmail(e.target.value)}
                            />
                            </div>
                            <div className="grid gap-2">
                            <Label>Password</Label>
                            <Input id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                {userFailed?<div className='flex items-center justify-center hidden'>msg</div>:<></>}
                <CardFooter>
                    <Button Button type="submit" className="w-full">
                        Login
                    </Button>
                </CardFooter>
            </Card>
            </div>

        </>
    )
}

export default loginPage;