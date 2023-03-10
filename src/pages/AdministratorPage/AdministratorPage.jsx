import React from "react";
import '../../styles/administrator.css';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AdministratorPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if(location.pathname === '/administrador') navigate('/');
        else navigate('/administrador');
    };

    return (
        <section className="pt-4 pb-5 row container-xxl m-auto text-center mb-5">

            <div className="d-flex justify-content-end">
                <button className="btn back-button" onClick={handleClick}>
                    <div className="d-flex justify-content-evenly align-items-center">
                        <i className="fa-solid fa-chevron-left"></i>
                        <p className="m-0">Atrás</p>
                    </div>
                </button>
            </div>

            <Outlet/>

        </section>
    );
}