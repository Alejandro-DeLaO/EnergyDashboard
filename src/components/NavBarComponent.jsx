import React from "react";
import { Link } from "react-router-dom";

export default function NavBarComponent() {
    return (
        <div style={{ fontSize: "1.3rem" }}>
            <nav className="navbar navbar-expand-lg primary-background">
                <div className="container-fluid d-flex justify-content-center">
                    <Link to='/' className="navbar-brand" style={{ fontSize: "30px", color: "white" }}>
                        <p className="m-0 text-wrap text-center">Sistema de monitoreo</p>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-user" style={{ color: 'white' }}></i>
                                    <Link to='/login' className="nav-link active" style={{ color: "white" }}>Login</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to='/dashboard' className="nav-link active" style={{ color: "white" }}>Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}