import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequiredAuth({allowedRoles}){
    const {auth} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth && !auth.user) navigate('/login');
    });
    
    return (
        (auth && auth.user) ? (allowedRoles.includes(auth.user.role) ? <Outlet />
        : <Navigate to='/' state={{from:location}} replace />) 
        : <Navigate to='/login' state={{from: location}} replace />
    );
}