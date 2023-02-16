import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import '../styles/navbar.css';

export default function NavBarComponent() {

    const { auth, logOut } = useAuth();

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
                            {
                                auth && auth.user && auth.user.role === 'admin' &&
                                <div className="d-flex align-items-center">
                                    <Link to='/dashboard' className="nav-link active" style={{ color: "white" }}>Dashboard</Link>
                                </div>
                            }
                        </ul>
                    </div>
                    <div className="btn-group">

                        <i className="fa-solid fa-user icon p-3 text-white" data-bs-toggle="dropdown" data-bs-display="static" />
                        {
                            auth && auth.user &&
                            <div className="d-flex align-items-center" data-bs-toggle="dropdown" data-bs-display="static">
                                <p className="m-0" style={{ color: "white" }}>{auth.user.name}</p>
                            </div>
                        }

                        <div className="dropdown-menu dropdown-menu-end auth-dropdown">
                            <div className="d-flex justify-content-center flex-column p-3">
                                <div className="text-center mb-3">
                                    <i className="fa-solid fa-user" style={{ fontSize: "5rem", color: "var(--energy-red)" }}></i>
                                </div>

                                <p style={{ fontSize: "2rem", textAlign: "center", color: "var(--energy-red)" }}>{`Hola${auth && auth.user ? ` ${auth.user.name}` : ''}`}!</p>

                                {
                                    auth && auth.user
                                        ? <>
                                            {auth.user.role === 'admin' && <Link to="administrador" className="user-button">Administrador</Link>}
                                            <Link to="perfil" className="user-button my-3">Ver perfil</Link>
                                            <button className="user-button" onClick={logOut}>Cerrar sesión</button>
                                        </>
                                        : <>
                                            <Link to="login" className="user-button m-3">Iniciar sesión</Link>
                                            <Link to="signup" className="user-button">Crear una cuenta</Link>
                                        </>
                                }
                            </div>
                            <div className="dropdown-divider"></div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}