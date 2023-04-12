import React, { useContext } from 'react';
import InputComponent from '../../../../components/InputComponent';
import { useForm } from 'react-hook-form';
import * as userService from "../../../../services/UserService";
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import UserContext from '../../../../context/UsersContext';

export default function CreateUserForm() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { auth } = useAuth();
    const { count, setCount } = useContext(UserContext);

    const onSubmit = async (data) => {
      try{ 
        await userService.postUser(data, auth.token);
        Swal.fire({
          title: "Usuario creado",
          icon: "success",
          confirmButtonText: "Ok",
          timer: 2000
        });
        setCount(count + 1);
        console.log(data);
      }catch(err) {
        Swal.fire({
          title: "Error al crear usuario, intentalo de nuevo",
          icon: "error",
          confirmButtonText: "Ok",
          timer: 2000
        });
        console.log(err);
      }
    }

    return(
        //Modal
        <div className="modal fade" id="createUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centerd">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Crea un usuario</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body text-start" style={{fontSize: "1.1rem"}}>
                  <InputComponent name="name" label="Nombre" placeholder="Introduce el nombre" register={register} errors={errors} required={true} className="mb-3" />
                  <InputComponent name="lastName" label="Apellido" placeholder="Introduce el apellido" register={register} errors={errors} required={true} className="mb-3" />
                  <InputComponent name="email" label="Correo electronico" placeholder="Introduce el correo electronico" register={register} errors={errors} required={true} className="mb-3" />
                  <InputComponent name="password" label="Contraseña" placeholder="Introduce la contraseña" register={register} errors={errors} required={true} className="mb-3" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-primary">Crear usuario</button>
                </div>
              </form>

            </div>
          </div>
        </div>
    );
}