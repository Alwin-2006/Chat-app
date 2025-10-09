import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from '../Sidebar'
import AuthProvider from '../../authContext'

const AppLayout = () => {
     return (
        <>  
            <AuthProvider>
            <div className='flex flex-col h-screen'>
            <Navbar />
            <Outlet />
            </div>
            </AuthProvider>
        </>
     )
}

export default AppLayout