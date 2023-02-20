import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import '../styles/navbar.css';

function SideNavBarComponent() {

  const { auth, logOut } = useAuth();

  return(
    <section className="container-xxl">
      <nav className="nav-container navbar bg-body-tertiary" style={{margin: "0 24px"}}>
        <div className="container-fluid">

          {/* Side button */}
          <button className="navbar-toggler me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Title */}
          <Link to='/' className="navbar-brand me-auto" style={{ fontSize: "20px", or: "black", fontFamily: "jost" }}>
            <p className="m-0 text-wrap text-center fw-bold">Energy CUT</p>
          </Link>

          {/* Dashboard text */}
                      {/* collapse navbar-collapse */}
          <div className="                        " id="navbarColor03">
            <ul className="navbar-nav ms-auto">
              {
                auth && auth.user && auth.user.role === 'admin' &&
                <div className="d-flex align-items-center">
                    <Link to='/dashboard' className="nav-link active fw-bold" style={{ fontSize: "1.1rem", color: "black", fontFamily: "jost" }}>Dashboard</Link>
                </div>
              }
            </ul>
          </div>

          {/* Login button and Name */}
          <div className="btn-group">

            <i className="fa-solid fa-user icon py-2 p-3 text-dark" style={{fontSize: "1.5rem"}} data-bs-toggle="dropdown" data-bs-display="static" />
            {
              auth && auth.user &&
              <div className="d-flex align-items-center" data-bs-toggle="dropdown" data-bs-display="static">
                <p className="m-0 fw-bold" style={{ fontSize: "1.1rem", color: "black", fontFamily: "jost" }}>{auth.user.name}</p>
              </div>
            }

            <div className="dropdown-menu dropdown-menu-end auth-dropdown">
              <div className="d-flex justify-content-center flex-column p-3">
                <div className="text-center mb-3">
                  <i className="fa-solid fa-user" style={{ fontSize: "5rem", color: "black" }}></i>
                </div>

                <p style={{ fontSize: "2rem", textAlign: "center", color: "black", fontFamily: "jost" }}>{`Hola${auth && auth.user ? ` ${auth.user.name}` : ''}`}!</p>

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

          {/* Side navbar */}
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Estudiantes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to="/" className="nav-link active fw-bold">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link to="/indicador/instituto-energias-renovables" className="nav-link active fw-bold">Instituto de energias renovables</Link>
                </li>
                <li className="nav-item">
                  <Link to="/indicador/centro-atencion-estudiantes" className="nav-link active fw-bold">Centro de atención a estudiantes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/indicador/biblioteca" className="nav-link active fw-bold">Biblioteca universitaria</Link>
                </li>
                <li className="nav-item">
                  <Link to="/indicador/ciencias-salud" className="nav-link active fw-bold">Ciencias de la salud</Link>
                </li>
                <li className="nav-item">
                    {/* to="dashboard" */}
                  <Link to="/test" className="nav-link active fw-bold">Monitoreo</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default SideNavBarComponent;