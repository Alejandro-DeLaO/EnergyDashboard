import React from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input";

function SignupForm() {
  return (
    <div className="bg-light container shadow-lg" style={{ width: "60%", height: "auto", display: "flex", placeItems: "center", borderRadius: "20px" }}>
      <div className="p-3" style={{ width: "100%", height: "90%" }}>
        <div style={{ fontSize: "1.3rem" }}>
          <h2>Crea una cuenta</h2>
          <p>Ingresa tus datos de usuario</p>
        </div>

        <div>
          <Input inputTitle="Nombre" inputType="text" />
          <Input inputTitle="Correo" inputType="text" />
          <Input inputTitle="Contraseña" inputType="password" />
          <button type="button" className="btn btn-success" style={{ width: "100%" }}>Crear cuenta</button>
        </div>

        <div className="mt-3" style={{ cursor: "pointer" }}>
          <Link to='/login' className="nav-link active">Ya tienes cuenta?</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;