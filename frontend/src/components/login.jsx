import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const apiUrl = "http://localhost:3000/auth/signin"

const LoginPage = () => {
  const { login } = useContext(AuthContext);  
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [userFailed, setUserFailed] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault() // stop form reload

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      if (res.ok) {
        const data = await res.json();
        const user = data.user;
        login(user, data.token);
        console.log(data);

        navigate(`/chats`) ;
      } else {
        
        setUserFailed(true)
      }
    } catch (err) {
      console.log(err.message);
      console.error(err)
      setUserFailed(true)
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            No Account? Sign up here!
            <Button variant="link" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <Label>Username</Label>
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="somethingsomething@something.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {userFailed && (
              <div className="text-red-500 text-sm text-center">
                Login failed. Please check your credentials.
              </div>
            )}

            <Button type="submit" className="w-full hover:cursor-pointer">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
