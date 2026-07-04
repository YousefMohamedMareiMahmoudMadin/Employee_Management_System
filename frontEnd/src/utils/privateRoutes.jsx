import React from 'react'
import {useAuth} from '../context/authContext'
import {Navigate} from 'react-router-dom'
const privateRoutes = () => {
    const{user,loading}=useAuth()
    if(loading){
        return <h1>Loading.</h1>
    }
    return user ? <Outlet/> : <Navigate to="/login"/>
    
}

export default privateRoutes