import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
  import { SidebarProvider } from "../ui/sidebar";
import {Button} from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
  
const Navbar = () =>{
    const contextValue = useContext(AuthContext);
    const {user, logout} = contextValue || {};
    return (
        <> 
            <div className = "h-16 flex py-5 justify-around items-center w-full">
                {user?<Link to={`/chats/${user._id}`}>App</Link>:<></>} 
                <NavigationMenu>
                    <NavigationMenuList className = 'flex gap-5 '>
                        <NavigationMenuItem><Link to = "/leaderboard"><FontAwesomeIcon icon={faChartSimple} className="text-2xl" /></Link></NavigationMenuItem>
                        <NavigationMenuItem>
                                    {user ? (
                                        <div className="flex items-center gap-3">
                                            <Link to={`/users/${user._id}`}>
                                                <Avatar>
                                                    <AvatarImage src={user.image} />
                                                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                            <Button onClick={logout} variant="outline" size="sm">
                                                Logout
                                            </Button>
                                        </div>
                                    ) : <div className="flex gap-5">
                                        <Button><Link to='/login'>Login</Link></Button>
                                        <Button><Link to='/signup'>Signup</Link></Button>
                                        </div>}
                                    
                                    </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>  
         
        </>
    )
}
export default Navbar