import React from "react";
import InputComponent from "../../../components/InputComponent";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import * as commentService from "../../../services/CommentService";
import { Link } from "react-router-dom";

export default function CreateCommentSection() {

  const { auth } = useAuth();
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    e.target.reset();
    //Add user to data.
    data.user = auth.user._id;

    try {
      await commentService.postComment(data);
      console.log("Comentario exitoso");
      console.log('Uploaded data: ', data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="container d-flex justify-content-center">
      <div className="my-3 py-4" style={{ width: "90%", borderRadius: "15px", border: "2px #606470 solid" }}>
        <div className="d-flex rounded mx-auto align-items-center" style={{ width: "90%" }}>
          <i className="fa-solid fa-user icon py-2 p-3 text-dark rounded" style={{ fontSize: "1.5rem" }} data-bs-toggle="dropdown" data-bs-display="static" />
          <h4 className="mb-0 mt-auto ms-1">{auth?.user?.name}</h4>
          {
            !auth?.user &&
            <>
              <p className="text-center m-0" style={{ fontSize: "1.2rem" }}>Inicia sesión para añadir un comentario.</p>
              <Link to='/login' className="btn btn-info mx-5" style={{ width: "25%" }}>Iniciar sesión</Link>
            </>
          }
        </div>

        {
          auth?.user &&
          <>
            <div className="mx-auto my-4 rounded" style={{ width: "90%" }}>
              <p className="text-center" style={{ fontSize: "1.2rem" }}>Deja un comentario acerca de la página, recuerda que los comentarios son públicos y que incluyen tú nombre.</p>
            </div>
            <div className="mx-auto mb-2 rounded" style={{ width: "90%" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputComponent name="content" label="Comentar" placeholder="Escribe un comentario" register={register} errors={errors} required={true} className="mb-3" />
                <button className="btn btn-info" style={{ width: "15%" }}>Subir</button>
              </form>
            </div>
          </>
        }
      </div>
    </section>
  );
}