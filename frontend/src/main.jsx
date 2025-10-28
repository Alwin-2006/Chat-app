import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom'
import LeaderBoard from "/src/components/leaderboard";
import UserPage from "/src/components/userPage";
import AppLayout from './components/layout/AppLayout.jsx'
import Login from './components/login.jsx'
import Chats from './components/Chats.jsx'
import Signup from './components/signup.jsx'
import Friends from './components/Friends.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<AppLayout />,
    children: [
      {
        path:"/chats/:id?", // make id optional
        element:<Chats />
      },  
      {
        path: "/",
        element:<App />
      },
      {
          path:"/leaderboard",
        element:<LeaderBoard />
      },
      {
        path:"/users/:id",
        element:<UserPage/ >
      },
      {
        path:"/login",
        element:<Login/ >
      },
      {
        path:"/signup",
        element:<Signup />
      },
      {
        path:"/:id/friends",
        element:<Friends />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
