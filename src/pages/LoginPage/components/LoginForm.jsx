import React from "react";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="bg-light container shadow-lg" style={{ width: "55%", height: "auto", display: "flex", placeItems: "center", borderRadius: "20px" }}>
      <div className="p-3" style={{ width: "100%", height: "90%" }}>
        <div style={{ fontSize: "1.3rem" }}>
          <h2>Inicia sesion</h2>
          <p>Ingresa tus datos de usuario</p>
        </div>

        <div>
          <Input inputTitle="Correo" inputType="text" />
          <Input inputTitle="Contraseña" inputType="password" />
          <button type="button" className="btn btn-success" style={{ width: "100%" }}>Iniciar sesion</button>
        </div>

        <div className="mt-3" style={{ cursor: "pointer" }}>
          <Link to='/signup' className="nav-link active">No tienes cuenta?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;