import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import Input from "../../../components/Input";
import InputComponent from "../../../components/InputComponent";
import useAuth from "../../../hooks/useAuth";
import * as authService from '../../../services/AuthService';

function SignupForm() {

  const {signUp} = useAuth();
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await authService.signUp(data);
      //Save user session.
      signUp(response.data.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.status === 400) {
        Swal.fire('Error', 'Ya existe una cuenta ligada a este correo electrónico, inicia sesión!', 'error');
        navigate('/login');
      }
      else Swal.fire('Error', 'Algo ha salido mal, intenta de nuevo más tarde!', 'error');
    }
  };

  return (
    <div className="form-container bg-light container shadow" style={{ width: "70%", height: "auto", display: "flex", placeItems: "center", borderRadius: "20px" }}>
      <div className="p-3" style={{ width: "100%", height: "90%" }}>
        <div style={{ fontSize: "1.3rem" }}>
          <h2>Crea una cuenta</h2>
          <p>Ingresa tus datos de usuario</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent className="col-12 mb-3" name="name" label="Nombre" placeholder="Escribe tu nombre"
            register={register} errors={errors} required={true}
            pattern={{ pattern: { value: /^[A-Za-z\s]*$/, message: "Solo se aceptan letras." } }}
          />
          <InputComponent className="col-12 mb-3" name="lastName" label="Apellidos" placeholder="Escribe tus apellidos"
            register={register} errors={errors} required={true}
            pattern={{ pattern: { value: /^[A-Za-z\s]*$/, message: "Solo se aceptan letras." } }}
          />
          <InputComponent className="col-12 mb-3" name="email" label="Email" placeholder="Escribe tu correo"
            register={register} errors={errors} required={true}
            pattern={{ pattern: { value: /\S+@\S+\.\S+/, message: "Dirección de correo incorrecta." } }}
          />
          <InputComponent className="col mb-3" name="password" type="password" label="Contraseña" placeholder="Escribe tu contraseña"
            register={register} errors={errors} required={true}
            pattern={{ pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, message: "Contraseña inválida." } }}
          />
          <button type="submit" className="btn btn-success" style={{ width: "100%" }}>Crear cuenta</button>
        </form>

        <div className="mt-3" style={{ cursor: "pointer" }}>
          <Link to='/login' className="nav-link active">Ya tienes cuenta?</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;