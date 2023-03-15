import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as authService from "../services/AuthService";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState();

    const logIn = (user, token) => {
        //And with the response save all neccesary information of user, roles, token and so on.
        setAuth({ user, token });

        //Save token and user only if roles are differente to customer
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));

        Swal.fire(`Hola ${user.name}`, `Nos alegramos de tenerte de vuelta!`, 'success');
    };

    const signUp = (user, token) => {
        //And with the response save all neccesary information of user, roles, token and so on.
        setAuth({ user, token });

        //Save token and user only if roles are differente to customer
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));

        Swal.fire(`Bienvenido ${user.name}`, `Nos alegramos de tenerte por aquí!`, 'success');
    };

    const logOut = () => {
        Swal.fire({
            title: 'Estás seguro de cerrar sesión?',
            //text: "Se cargarán los productos en la base de datos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, cerrar sesión!'
        }).then((result) => {
            if (result.isConfirmed) {
                //Set auth as null.
                setAuth({});
                //And delete data in sessionStorage.
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                navigate({ pathname: '/' });
            }
        })
    };

    const expiredToken = () => {
        setAuth({});
        localStorage.clear();
        Swal.fire('Sesión caducada', 'Vuelve a iniciar sesión!', 'info');
        navigate({ pathname: '/login' });
    };

    useEffect(() => {
        //Every time that page gets refreshed, get token from sessionStorage if exists.
        if (authService.ACCESS_TOKEN()) setAuth({ token: authService.ACCESS_TOKEN(), user: JSON.parse(authService.ACCESS_USER()) });
        else setAuth({});
    }, [])

    return (
        <>
            {//Wait until auth is ready, either there is a token or a null object, just to be able to protect routes correctly.
                auth && <AuthContext.Provider value={{ auth, setAuth, logOut, logIn, signUp, expiredToken }}>
                    {children}
                </AuthContext.Provider>
            }
        </>
    );
};

export default AuthContext;