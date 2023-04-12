import React from "react";
import "../styles/notFoundPage.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFoundPage(){

    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.pathname);

    const handleClick = () => {
        navigate("/");
    }

    return (
        <section className="container-xxl mb-5 mt-4">
            <div className="d-flex justify-content-center my-3">
                <img alt="404 error" src="/assets/404Img.jpg" style={{height: "100%", width: "60%"}} />
            </div>
            <div className="d-grid justify-content-center">
                <h1 className="m-auto my-2"><b>Página no encontrada</b></h1>
                <p className="my-2" style={{fontSize: "1.1rem"}}>La url <b>EnergyCUT{location.pathname}</b> no fue encontrada, asegurate de haberlo escrito correctamente</p>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn back-button" style={{width: "150px"}} onClick={handleClick}>
                    <div className="d-flex justify-content-evenly align-items-center">
                        <i className="fa-solid fa-chevron-left"></i>
                        <p className="m-0">Volver al inicio</p>
                    </div>
                </button>
            </div>
        </section>
    );
}