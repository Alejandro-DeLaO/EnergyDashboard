import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import * as buildingService from '../../../../services/BuildingService';
import BuildingContext from "../../../../context/BuildingContext";
import UpdateBuildingForm from "./UpdateBuildingForm";
import CreateBuildingForm from "./CreateBuildingForm";

function BuildingsTableSection() {

  const navigate = useNavigate();
  const { auth, expiredToken } = useAuth();
  const [buildings, setBuildings] = useState();
  const { setBuildingId, count } = useContext(BuildingContext);

  //Update building --Get the building id and send it to UpdateBuildingForm--
  const getBuildingId = async (id) => {
    try{
      await setBuildingId(id);
      console.log("Building ID: ", id);
    } catch(err) {
      console.log(err);
    }
  }

  //Delete building
  const deleteBuilding = (id) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar el edificio?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        buildingService.deleteBuilding(id, auth.token)
        .then(() => {
          setBuildings(prevBuildings => prevBuildings.filter(building => building._id !== id));
          Swal.fire({
            title: 'El edificio fue eliminado con exito',
            icon: 'info'
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Error al eliminar el edificio, intentalo de nuevo',
            icon: 'info'
          });
          console.log(err);
        });
      } else {
        Swal.fire({
          title: 'El edificio no fue eliminado',
          icon: 'info'
        });
      }
    })
  };
  

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
  }, [count]);

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
                <button className="btn btn-success me-1" data-bs-toggle="modal" data-bs-target="#createBuilding">
                  <i className="fa-solid fa-plus"></i><span>Añadir edificio</span>
                </button>
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
                buildings ? buildings.map((building) => {
                  return(
                    <tr key={building._id}>
                    {
                      building &&
                      <>
                        <td>{building.name}</td>
                        <td>
                          <button onClick={() => getBuildingId(building._id)} className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#updateBuilding">
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <button onClick={() => deleteBuilding(building._id)} className="btn btn-danger mx-2">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </>
                    }
                  </tr>
                  )
                })
                  :
                  <tr>
                    <td>Aún no hay edificios</td>
                  </tr>
              }
            </tbody>

          </table>
        </div>
      </div>
      <UpdateBuildingForm />
      <CreateBuildingForm />
    </section>
  );
}

export default BuildingsTableSection;