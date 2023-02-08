import React from "react";
import { Link } from "react-router-dom";

export default function NavBarComponent() {
    return (
        <div style={{ fontSize: "1.3rem" }}>
            <nav className="navbar navbar-expand-lg bg-success">
                <div className="container-fluid d-flex">
                    <Link to='/' className="navbar-brand" style={{ fontSize: "30px", color: "white" }}>Instituto de Energias Renovables</Link>

                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" style={{ color: "white" }}>Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/dashboard' className="nav-link active" style={{ color: "white" }}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <div className="d-flex align-items-center">
                                    <Link to='/login' className="nav-link active" style={{ color: "white" }}>Iniciar sesión</Link>
                                    <i className="fa-solid fa-user" style={{color: 'white'}}></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}