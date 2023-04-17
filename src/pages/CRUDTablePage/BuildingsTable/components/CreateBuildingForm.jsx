import React, { useContext } from "react";
import InputComponent from "../../../../components/InputComponent";
import { useForm } from "react-hook-form";
import * as buildingService from "../../../../services/BuildingService"
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import BuildingContext from "../../../../context/BuildingContext";

export default function CreateBuildingForm() {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const { count, setCount } = useContext(BuildingContext);
  const { auth } = useAuth();

  const onSubmit = async (data) => {
    try{  
      await buildingService.postBuilding(data, auth.token);
      Swal.fire({
        title: "Edificio creado",
        icon: "success",
        confirmButtonText: "Ok",
        timer: 2000
      });
      setCount(count + 1);
      console.log(data);
    }catch(err) {
      Swal.fire({
        title: "Error al crear edificio, intentalo de nuevo",
        icon: "error",
        confirmButtonText: "Ok",
        timer: 2000
      });
      console.log(err);
    }
  }

  return(
    //Modal
    <div className="modal fade" id="createBuilding" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Crea un nuevo edificio</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body text-start" style={{fontSize: "1.1rem"}}>
              <InputComponent name="name" label="Añade el nombre del edificio" placeholder="Nombre" register={register} errors={errors} required={true} className="mb-3" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary">Crear</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}