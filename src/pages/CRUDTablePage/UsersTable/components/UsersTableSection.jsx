import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import * as userService from '../../../../services/UserService';
import CreateUserForm from "./CreateUserForm";
import UserContext from "../../../../context/UsersContext";

function UsersTableSection() {

  const navigate = useNavigate()
  const [users, setUsers] = useState();
  const { auth, expiredToken } = useAuth();
  const { count, setCount } = useContext(UserContext);

  //Delete building
  const deleteUser = (id) => {
    console.log(id);
    Swal.fire({
      title: '¿Estás seguro de eliminar a este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        userService.deleteUser(id, auth.token)
        .then(() => {
          setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
          Swal.fire({
            title: 'El usuario fue eliminado con exito',
            icon: 'info'
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Error al eliminar usuario, intentalo de nuevo',
            icon: 'info'
          });
          console.log(err);
        });

      } else {
        Swal.fire({
          title: 'El usuario no fue eliminado',
          icon: 'info'
        });
      }
    })
  };

  //Update user
  //No re-renderiza al cambiar el rol de un usuario :(
  const updateUser = (id, name, lastName, role) => {
    let newRole = "";
    if (role === "admin") {
      newRole = "user"
    } else if (role === "user") {
      newRole = "admin"
    }

    const data = {
      name: name,
      lastName: lastName,
      role: newRole
    }

    Swal.fire({
      title: '¿Estás seguro de cambiar el rol de este usuario',
      text: 'Si el rol del usuario es "user" cambiará su rol a "admin" y recibirá permisos de administrador, en cambio, si su rol es "admin" cambiará su rol a "user" y perederá los permisos de administrador',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        userService.updateUser(id, data, auth.token);
        setCount(count + 1);
        Swal.fire({
          title: 'El rol del usuario fue cambiado con éxito',
          icon: 'info'
        });
      } else {
        Swal.fire({
          title: 'El rol del usuario no se ha cambiado',
          icon: 'info'
        });
      }
    })
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersResponse = await userService.getUsers(auth.token);
        setUsers(usersResponse.data.data.users);
      } catch (error) {
        if (error.response && error.response.data.status === 401) {
          expiredToken();
          navigate('/login');
        } else if (error.response && error.response.data.status === 400) Swal.fire('Error', error.response.data.error, 'error');
        else Swal.fire('Error', 'Algo ha salido mal, intenta de nuevo.' + error, 'error');
      }
    };
    getUsers();
  }, [count]);

  return (
    <section className="container my-5">
      <div className="table-responsive-sm">
        <div className="table-wrapper">

          <div className="table-title mb-3">
            <div className="row">
              <div className="col-sm-6">
                <h2>Administrar <b>usuarios</b></h2>
              </div>
              <div className="col-sm-6 d-flex m-auto justify-content-end">
                <button className="btn btn-success me-1" data-bs-toggle="modal" data-bs-target="#createUser">
                  <i className="fa-solid fa-plus"></i> <span>Añadir usuario</span>
                </button>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">

            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {
                users ? users.map((user) => {
                  // return <UserRow key={index} user={user} />
                  return(
                  <tr key={user._id}>
                  {
                    user &&
                    <>
                      <td>{user.name}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={() => updateUser(user._id, user.name, user.lastName, user.role)} className="btn btn-primary mx-2">
                          {
                            user.role === "user" ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>
                          }
                        </button>
                        <button onClick={() => deleteUser(user._id)} className="btn btn-danger mx-2">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </>
                  }
                </tr>
                )})
                  :
                  <tr>
                    <td>Aún no hay usuarios</td>
                  </tr>
              }
            </tbody>

          </table>
        </div>
      </div>
      <CreateUserForm />
    </section>
  );
}

export default UsersTableSection;