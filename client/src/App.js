import React, { useEffect,useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';



/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'


export default function App() {


/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Profile></Profile>
    },
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
        element : <AuthorizeUser><Profile /></AuthorizeUser>
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
