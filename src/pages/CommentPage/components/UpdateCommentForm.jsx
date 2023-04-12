import React, { useContext } from 'react';
import InputComponent from '../../../components/InputComponent';
import CommentContext from '../../../context/CommentContext';

import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from "../../../hooks/useAuth";
import * as commentService from '../../../services/CommentService'

export function UpdateCommentForm() {

  const { auth } = useAuth();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { comm, commentCount, setCommentCount } = useContext(CommentContext);

  const onSubmit = async (data) => {
    data.user = auth.user._id
    console.log(comm);

    try{
      await commentService.updateComment(comm, data);
      Swal.fire({
        title: 'Comentario actualizado con éxito',
        icon: 'success',
        confirmButtonText: "Ok",
        timer: 2000
      });
      setCommentCount(commentCount + 1);
      console.log(data);
    } catch(error) {
      Swal.fire({
        title: 'Error al actualizar comentario, intentalo de nuevo',
        icon: 'error',
        confirmButtonText: "Ok",
        timer: 2000
      });
      console.log(error);
    }
  }
  
  return(
    //Modal
    <div className="modal fade" id="editComment" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edita el contenido del comentario</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <h5>Contenido del comentario</h5>
              <InputComponent name="content" placeholder="Escribe un comentario" register={register} errors={errors} required={true} className="mb-3" />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}