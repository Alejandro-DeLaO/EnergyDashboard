import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import * as userService from '../../services/UserService';

function UserRow(props) {
  return (
    <tr>
      {
        props.user &&
        <>
          <td>{props.user.name}</td>
          <td>{props.user.lastName}</td>
          <td>{props.user.email}</td>
          <td>{props.user.role}</td>
          <td>
            <a class="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#user-detail">
              <i class="fa-solid fa-pen"></i>
            </a>
            <a class="btn btn-danger mx-2">
              <i class="fa-solid fa-trash"></i>
            </a>
          </td>
        </>
      }
    </tr>
  );
}

function UsersTablePage() {

  const { auth } = useAuth();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersResponse = await userService.getUsers(auth.token);
        setUsers(usersResponse.data.data.users);
      } catch (error) {

      }
    };
    getUsers();
  }, []);

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
                <a href="/" className="btn btn-success me-1" data-toggle="modal"><i class="fa-solid fa-plus"></i> <span>Añadir usuario</span></a>
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
                users ? users.map((user, index) => {
                  return <UserRow key={index} user={user} />
                })
                  :
                  <p>Aun no hay usuarios</p>
              }
            </tbody>

          </table>
        </div>
      </div>
    </section>
  );
}

export default UsersTablePage;