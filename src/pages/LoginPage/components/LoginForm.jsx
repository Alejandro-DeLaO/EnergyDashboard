import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as authService from '../../../services/AuthService';
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import InputComponent from "../../../components/InputComponent";

function LoginForm() {

  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? (location.state.from ? location.state.from.pathname : '') : '/';
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.logIn(data);
      logIn(response.data.data.user, response.data.token);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error.statusCode === 401) {
        Swal.fire('Error', 'Correo o contraseña incorrectos!', 'error');
        navigate('/login');
      } else Swal.fire('Error', 'Algo ha salido mal, intenta de nuevo.' + error, 'error');
    }
  };

  return (
    <div className="bg-light container shadow-lg" style={{ width: "55%", height: "auto", display: "flex", placeItems: "center", borderRadius: "20px" }}>
      <div className="p-3" style={{ width: "100%", height: "90%" }}>
        <div style={{ fontSize: "1.3rem" }}>
          <h2>Inicia sesion</h2>
          <p>Ingresa tus datos de usuario</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent name="email" label="Correo" placeholder="Escribe tu correo" register={register} errors={errors} required={true} pattern={{ pattern: { value: /\S+@\S+\.\S+/, message: "Dirección de correo incorrecta." } }} className="mb-3" />
          <InputComponent name="password" type="password" label="Contraseña" placeholder="Escribe tu contraseña" register={register} errors={errors} required={true} className="mb-3" />
          <button type="submit" className="btn btn-success" style={{ width: "100%" }}>Iniciar sesion</button>
        </form>

        <div className="mt-3" style={{ cursor: "pointer" }}>
          <Link to='/signup' className="nav-link active">No tienes cuenta?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;