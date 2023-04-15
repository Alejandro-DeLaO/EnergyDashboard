import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

import InputComponent from "../../../components/InputComponent";
import CommentContext from "../../../context/CommentContext";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

import { UpdateCommentForm } from "./UpdateCommentForm";
import * as commentService from "../../../services/CommentService";

export default function CreateCommentSection() {

  // Post comment
  const { auth, expiredToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { commentCount, setCommentCount, setComm } = useContext(CommentContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [totalComments, setTotalComments] = useState(10);
  const [comments, setComments] = useState([]);


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
  const getComment = async (comment) => {
    try {
      await setComm(comment);
      console.log(comment);
    } catch (error) {
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
      if (result.isConfirmed) {
        commentService.deleteComment(id);
        setCommentCount(commentCount + 1);
        Swal.fire({
          title: 'El comentario fue eliminado con exito',
          icon: 'info'
        });
      } else {
        Swal.fire({
          title: 'El comentario no fue eliminado',
          icon: 'info'
        });
      }
    })
  };

  // Show all comments
  useEffect(() => {
    const getComments = async () => {
      let params = {
        page: currentPage
      };
      for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        params[param] = value;
      }
      try {
        const commentsResponse = await commentService.getComments(params);
        const commentsFromResponse = commentsResponse.data.data.comments;
        const totalCommentsFromResponse = commentsResponse.data.results;

        //Validate pagination
        if ((commentsFromResponse.length === 0 && totalCommentsFromResponse !== 0) || params.page === '031') {
          handlePageChange({ selected: 0 });
          return;
        }

        setComments(commentsFromResponse);
        setTotalComments(totalCommentsFromResponse);
      } catch (error) {
        if (error.response && error.response.data.status === 401) {
          expiredToken();
          navigate('/login');
        } else if (error.response && error.response.data.status === 400) Swal.fire('Error', error.response.data.error, 'error');
        else Swal.fire('Error', 'Algo ha salido mal, intenta de nuevo.' + error, 'error');
      }
    }
    getComments();
  }, [location, commentCount]);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1);

    navigate({
      pathname: '/comments',
      search: location.search !== '' ? location.search.replace(/page=\d+/, `page=${data.selected + 1}`) : `page=${data.selected + 1}`
      //`${location.search !== '' ? location.search + '&' : `page=${data.selected+1}`}`
    });

    window.scrollTo(0, 0);
  };

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
                    <button onClick={() => getComment(comment._id)} className='btn btn-warning me-1' data-bs-toggle="modal" data-bs-target="#editComment" style={{ fontSize: ".9rem" }}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    {/* Delete button */}
                    <button onClick={() => deleteComment(comment._id)} className='btn btn-danger ms-1' style={{ fontSize: ".9rem" }}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </>
              }
            </div>
          )).reverse()
        }
      </div>
      {/* Modal */}
      <UpdateCommentForm />

      <ReactPaginate
        previousLabel={<i className="fa-solid fa-left-long"></i>}
        nextLabel={<i className="fa-solid fa-arrow-right-long"></i>}
        breakLabel='...'
        pageCount={Math.ceil(totalComments / 12)}
        marginPagesDisplayed='1'
        pageRangeDisplayed='3'
        onPageChange={handlePageChange}
        containerClassName='pagination justify-content-center'
        pageClassName='page-item'
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        previousClassName="page-item"
        nextLinkClassName="page-link"
        nextClassName="page-item"
        breakLinkClassName="page-link"
        breakClassName="page-item"
        activeClassName="active"
      />
    </section>
  );
}

