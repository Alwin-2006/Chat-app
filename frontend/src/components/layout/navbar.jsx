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
  
const Navbar = (props) =>{
    const { user } = props;
    return (
        <>
            
            <div className = "h-16 flex justify-around items-center w-full">
                <Link to="/">App</Link> 
                <NavigationMenu>
                    <NavigationMenuList className = 'flex gap-5 '>
                        <NavigationMenuItem><Link to = "/leaderboard"><FontAwesomeIcon icon={faChartSimple} className="text-2xl" /></Link></NavigationMenuItem>
                        <NavigationMenuItem>
                                    {user ? (
                                        <Link to="/user/:id">
                                        <Avatar>
                                        <AvatarImage src={user.image} />
                                        <AvatarFallback>?</AvatarFallback>
                                        </Avatar>
                                        </Link>
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