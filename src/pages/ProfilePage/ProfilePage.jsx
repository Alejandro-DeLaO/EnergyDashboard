import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../../components/InputComponent";
import useAuth from "../../hooks/useAuth";
import * as userService from "../../services/UserService";
import Swal from "sweetalert2";

export default function ProfilePage() {

    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const { auth } = useAuth();
    const [count, setCount] = useState();

    console.log(auth.user._id, auth.user.name);

    const onSubmit = async (data) => {
        const id = auth.user._id;

        try{
            await userService.updateUser(id, data, auth.token);
            Swal.fire({
              title: "Información actualizada",
              icon: "success",
              confirmButtonText: "Ok",
              timer: 2000  
            })
            setCount(count + 1);
        }catch(err) {
            Swal.fire({
                title: 'Error al actualizar información',
                icon: 'error',
                confirmButtonText: "Ok",
                timer: 2000
            });
            console.log(err)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try{
                const userResponse = await userService.getUser(auth.user._id, auth.token);
                setValue("name", userResponse.data.data.user.name);
                setValue("lastName", userResponse.data.data.user.lastName);
                setValue("email", userResponse.data.data.user.email);
            }catch(error) {
                Swal.fire({
                    title: 'Error al cargar la información, intenta de nuevo recargando la página',
                    icon: 'error',
                    confirmButtonText: "Ok",
                    timer: 2000
                });
            }
        }

        getUser();

    }, [count]);

    const randomNum = Math.floor(Math.random() * 7 + 1);
    const randomImg = "/assets/userIcon" + randomNum + ".png";

    return(
        <section className="container-xxl">
            <div className="row g-0 py-4">

                <div className="col-sm-4 card shadow mx-auto mb-4" style={{height: "100%"}}>
                    {/* <div className="card-header" style={{padding: "1rem", fontWeight: "500", fontSize: "1.2rem"}}>Foto de perfil</div> */}
                    <div className="card-body" style={{flexDirection: ""}}>
                        <img className="d-block m-auto" alt="perfil" src={randomImg} style={{width: "70%"}} />
                        {/* <button className="d-block btn btn-primary mt-4 mb-2 m-auto" style={{color: "white"}}>Editar foto de perfil</button> */}
                    </div>
                </div>

                <div className="col-sm-7 card shadow mx-auto" style={{height: "100%"}}>
                    <div className="card-header" style={{padding: "1rem", fontWeight: "500", fontSize: "1.2rem"}}>Informacion de la cuenta</div>
                    <div className="card-body">
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <div >
                                <InputComponent name="name" label="Nombre" placeholder="Escribe tu nombre" register={register} errors={errors} required={true} className="mb-4" />
                            </div>
                            <div>
                                <InputComponent name="lastName" label="Apellidos" placeholder="Escribe tus apellidos" register={register} errors={errors} required={true} className="mb-4" />
                            </div>
                            <div>
                                <InputComponent disabled={true} name="email" label="Correo electronico" placeholder="Escribe tu correo electronico" register={register} errors={errors} required={true} className="mb-4" />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2">
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}