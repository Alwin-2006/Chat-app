import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from '../Sidebar'


const AppLayout = () => {
     return (
        <>
            <Navbar />
            <Outlet />
        </>
     )
}

export default AppLayout