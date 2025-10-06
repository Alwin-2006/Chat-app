import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom'
import LeaderBoard from "/src/components/leaderboard";
import userPage from "/src/components/userPage";
import AppLayout from './components/layout/AppLayout.jsx'
import Login from './components/login.jsx'
import Chats from './components/Chats.jsx'
import Signup from './components/signup.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<AppLayout />,
    children: [
      {
        path:"/chats/:id",
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
        element:<userPage/ >
      },
      {
        path:"/login",
        element:<Login/ >
      },
      {
        path:"/signup",
        element:<Signup />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
