import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';



/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

// import orderComponents
import Navbar from './components/Orders/Navbar';
import Home from './components/Orders/Home';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'


export default function App() {


/** root routes */
const router = createBrowserRouter([
    {
        path : '/login',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Navbar/><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    
    
    
    {
        path : '/',
        element : <AuthorizeUser><Navbar/><Home/></AuthorizeUser>
    },
  
    





    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    }

])



  return (
    <main>
        <RouterProvider router={router} ></RouterProvider>
    </main>
  )
}
