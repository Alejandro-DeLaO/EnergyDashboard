import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

import InputComponent from "../../../components/InputComponent";
import CommentContext from "../../../context/CommentContext";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

import { UpdateCommentForm } from "./UpdateCommentForm";
import * as commentService from "../../../services/CommentService";

export default function CreateCommentSection() {

  // Post comment
  const { auth } = useAuth();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { commentCount, setCommentCount } = useContext(CommentContext);

  const onSubmit = async (data, e) => {
    e.target.reset();

    //Add user to data.
    data.user = auth.user._id;

    try {
      await commentService.postComment(data);
      Swal.fire({
        title: "Comentario publicado",
        icon: "success",
        confirmButtonText: "Ok",
        timer: 2000
      });
      setCommentCount(commentCount + 1);
      console.log('Uploaded data: ', data)
    } catch (err) {
      Swal.fire({
        title: "Error al publicar comentario, intentalo de nuevo",
        icon: "error",
        confirmButtonText: "Ok",
        timer: 2000
      });
      console.log(err);
    }
  }

  // Update comment
  const { setComm } = useContext(CommentContext);

  const getComment = async (comment) => {
    try{
      await setComm(comment);
      console.log(comment);
    }catch(error) {
      console.log(error);
    }
  }

  //Delete comment
  const deleteComment = (id) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar el comentario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        commentService.deleteComment(id);
        setCommentCount(commentCount + 1);
        Swal.fire({
          title: 'El producto fue eliminado con exito',
          icon: 'info'
        });
      } else {
        Swal.fire({
          title: 'El producto no fue eliminado',
          icon: 'info'
        });
      }
    })
  };

  // Show all comments
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const result = await commentService.getComments();
        setComments(result.data.data.comments);
        console.log(result.data.data.comments);
      } catch(err) {
        console.log(err);
      }
    }
    getComments();
  }, [commentCount]);

  return (
      <section className="container justify-content-center">
        <div className="my-3 py-4 mx-auto" style={{ width: "90%", borderRadius: "15px", border: "2px #606470 solid" }}>
          <div className="rounded mx-auto" style={{ width: "90%" }}>
            <div className="d-flex">
              <i className="fa-solid fa-user icon py-2 p-3 text-dark rounded" style={{ fontSize: "1.5rem" }} data-bs-toggle="dropdown" data-bs-display="static" />
              <h4 className="mb-0 mt-auto ms-1">{auth?.user?.name}</h4>
            </div>
            {
              !auth?.user &&
              <>
                <p className="text-center my-3 mx-0" style={{ fontSize: "1.2rem" }}>Inicia sesión para añadir un comentario.</p>
                <div className="d-flex justify-content-center">
                  <Link to='/login' className="btn btn-info my-2" style={{ width: "25%" }}>Iniciar sesión</Link>
                </div>
              </>
            }
          </div>

          {/* Create comment */}
          {
            auth?.user &&
            <>
              <div className="mx-auto my-4 rounded" style={{ width: "90%" }}>
                <p className="text-center" style={{ fontSize: "1.2rem" }}>Deja un comentario acerca de la página, recuerda que los comentarios son públicos y que incluyen tú nombre.</p>
              </div>
              <div className="mx-auto mb-2 rounded" style={{ width: "90%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputComponent name="content" label="Comentar" placeholder="Escribe un comentario" register={register} errors={errors} required={true} className="mb-3" />
                  <button type="submit" className="btn btn-info" style={{ width: "15%" }}>Publicar</button>
                </form>
              </div>
            </>
          }
        </div>

        {/* Show all comments */}
        <div className="container">
          {comments.length === 0 && <p style={{ width: "90%" }}>No hay comentarios para mostrar</p>}

          <div className="container mt-5" style={{ width: "90%", fontSize: "2rem" }}>
            <p>Comentarios: <span>{comments.length}</span></p>
          </div>

          {
            comments.map(comment => (
              <div className="my-3 mx-auto py-4 p-3 rounded" style={{ width: "90%", border: "1px solid black" }} key={comment._id}>
                <div className="d-flex">
                  <i className="fa-solid fa-user icon py-2 p-3 text-dark rounded" style={{ fontSize: "1.1rem" }} data-bs-toggle="dropdown" data-bs-display="static" />
                  <h4 className="mb-0 mt-auto ms-1">{comment?.user?.name}</h4>
                </div>
                <p className="ms-5 px-4 mt-2">{comment.content}</p>
                {
                  auth?.user && auth?.user?.name === comment?.user?.name &&
                  <>
                    <div className='d-flex justify-content-end mt-3'>
                      {/* Edit button */}
                      <button onClick={() => getComment(comment._id)} className='btn btn-warning me-1' data-bs-toggle="modal" data-bs-target="#editComment" style={{ fontSize: ".9rem" }}><i className="fa-regular fa-pen-to-square"></i></button>
                      {/* Delete button */}
                      <button onClick={() => deleteComment(comment._id)} className='btn btn-danger ms-1' style={{ fontSize: ".9rem" }}><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </>
                }
              </div>
            )).reverse()
          }
        </div>
        {/* Modal */}
        <UpdateCommentForm />
      </section>
  );
}

