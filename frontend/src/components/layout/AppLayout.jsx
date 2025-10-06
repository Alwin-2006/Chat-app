import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from '../Sidebar'


const AppLayout = () => {
     return (
        <>  
            <div className='flex flex-col h-screen'>
            <Navbar />
            <Outlet />
            </div>
        </>
     )
}

export default AppLayout