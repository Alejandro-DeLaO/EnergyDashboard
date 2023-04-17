import React, { useContext } from "react";
import InputComponent from "../../../../components/InputComponent";
import BuildingContext from "../../../../context/BuildingContext";
import * as buildingService from "../../../../services/BuildingService";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";

export default function UpdateBuildingForm() {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const { buildingId, count, setCount } = useContext(BuildingContext);
  const { auth } = useAuth();

  const onSubmit = async (data) => {
    try{
      await buildingService.updateBuilding(buildingId, data, auth.token);
      Swal.fire({
        title: 'Edificio actualizado con éxito',
        icon: 'success',
        confirmButtonText: "Ok",
        timer: 2000
      });
      setCount(count + 1);
      console.log(data);
    } catch(err) {
      Swal.fire({
        title: 'Error al actualizar el edificio, intentalo de nuevo',
        icon: 'error',
        confirmButtonText: "Ok",
        timer: 2000
      });
      console.log(err);
    }
  }

  return (
    <div className="modal fade" id="updateBuilding" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Actualiza el nombre del edficio</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body" style={{fontSize: "1.1rem"}}>
              <InputComponent name="name" placeholder="Cambia el nombre del edificio" register={register} errors={errors} required={true} className="mb-3" />
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