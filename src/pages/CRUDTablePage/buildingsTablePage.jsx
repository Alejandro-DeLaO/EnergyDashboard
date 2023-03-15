import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import * as buildingService from '../../services/BuildingService';

function BuildingRow(props) {
  return (
    <tr>
      {
        props.building &&
        <>
          <td>{props.building.name}</td>
          <td>
            <a href="..." className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#user-detail">
              <i className="fa-solid fa-pen"></i>
            </a>
            <a href="..." className="btn btn-danger mx-2">
              <i className="fa-solid fa-trash"></i>
            </a>
          </td>
        </>
      }
    </tr>
  );
}

function BuildingsTablePage() {

  const navigate = useNavigate();
  const { auth, expiredToken } = useAuth();
  const [buildings, setBuildings] = useState();

  useEffect(() => {
    const getBuildings = async () => {
      try {
        const buildingsResponse = await buildingService.getBuildings(auth.token);
        setBuildings(buildingsResponse.data.data.buildings);
      } catch (error) {
        if (error.response && error.response.data.status === 401) {
          expiredToken();
          navigate('/login');
        } else if (error.response && error.response.data.status === 400) Swal.fire('Error', error.response.data.error, 'error');
        else Swal.fire('Error', 'Algo ha salido mal, intenta de nuevo.' + error, 'error');
      }
    };
    getBuildings();
  }, []);

  return (
    <section className="container mt-3">
      <div className="table-responsive-sm">
        <div className="table-wrapper">

          <div className="table-title mb-3">
            <div className="row">
              <div className="col-sm-6">
                <h2>Administrar <b>edificios</b></h2>
              </div>
              <div className="col-sm-6 d-flex m-auto justify-content-end">
                <a href="/" className="btn btn-success me-1" data-toggle="modal"><i class="fa-solid fa-plus"></i> <span>Añadir edificio</span></a>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">

            <thead>
              <tr>
                <th>Edificio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {
                buildings ? buildings.map((building, index) => {
                  return <BuildingRow key={index} building={building} />
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

export default BuildingsTablePage;