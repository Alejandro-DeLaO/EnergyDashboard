import React from "react";
import Input from "./components/Input";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import * as userService from "../../services/UserService";

export default function ProfilePage() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { auth } = useAuth();
    console.log(auth.user._id);

    const onSubmit = async (data) => {
        const id = auth.user._id;

        try{
            await userService.updateUser(id, data, auth.token);
            console.log("Usuario actualizado");
        }catch(err) {
            console.log(err)
        }

    }

    return(
        <section className="container-xxl" style={{height: "80vh"}}>
            <div className="row g-0 py-4">

                <div className="col-sm-4 card shadow mx-auto">
                    <div className="card-header" style={{padding: "1rem", fontWeight: "500", fontSize: "1.2rem"}}>Foto de perfil</div>
                    <div className="card-body" style={{flexDirection: ""}}>
                        <img className="d-block m-auto" alt="perfil" src="/assets/linkImg6.png" style={{width: "60%"}} />
                        <button className="d-block btn btn-primary mt-4 mb-2 m-auto" style={{backgroundColor: "", color: "white"}}>Editar foto de perfil</button>
                    </div>
                </div>

                <div className="col-sm-7 card shadow mx-auto">
                    <div className="card-header" style={{padding: "1rem", fontWeight: "500", fontSize: "1.2rem"}}>Informacion de la cuenta</div>
                    <div className="card-body">
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                                <Input name="name" label="Nombre" value={auth.user.name} placeholder="Escribe tu nombre" register={register} errors={errors} required={true} className="mb-4" />
                            </div>
                            <div>
                                <Input name="lastName" label="Apellidos" value={auth.user.lastName} placeholder="Escribe tus apellidos" register={register} errors={errors} required={true} className="mb-4" />
                            </div>
                            <div>
                                <Input name="email" label="Correo electronico" value={auth.user.email} placeholder="Escribe tu correo electronico" register={register} errors={errors} required={true} className="mb-4" />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#updateBuilding">
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}