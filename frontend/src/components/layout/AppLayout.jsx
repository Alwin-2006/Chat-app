import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Sidebar from '../Sidebar'
import AuthProvider from '../../authContext'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const AppLayout = () => {
     return (
        <>  
            <AuthProvider>
            <div className='flex flex-col h-screen'>
            <div className='flex justify-around'><Navbar /></div>
            <Outlet />
            </div>
            </AuthProvider>
        </>
     )
}

export default AppLayout