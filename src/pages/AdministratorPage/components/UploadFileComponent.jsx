import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputComponent from "../../../components/InputComponent";
import useAuth from "../../../hooks/useAuth";
import * as fileService from '../../../services/FileService';

export default function UploadFileComponent() {

    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        //Validate that current location is able to upload a file.
        if (location.pathname !== '/administrador/subirDatos/energiaGenerada' && location.pathname !== '/administrador/subirDatos/energiaConsumida') {
            Swal.fire('Ruta equivocada', 'Esa ruta no es válida para subir un archivo!', 'warning');
            navigate('/administrador');
        }
    });

    const onSubmit = (data) => {
        Swal.fire({
            title: 'Estás seguro de cargar este archivo?',
            text: "Se cargarán los registros en la base de datos!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, cargar!'
        }).then((result) => {
            if (result.isConfirmed) {

                const formData = new FormData();
                formData.append("data", file);

                const uploadFile = async () => {
                    //If so, send file to backend.
                    try {
                        let uploadFileTo = location.pathname.includes('subirDatos/energiaGenerada') ? 'photovoltaicGenerations' : 'energyConsumption';
                        //Upload information.
                        uploadFileTo === 'energyConsumption' ? await fileService.postEnergyConsumptionFile(formData, auth.token) : await fileService.postPhotovoltaicGenerationFile(formData, auth.token);

                        Swal.fire('Muy bien', 'Datos cargados correctamente!', 'success');
                        navigate('/administrador');
                    } catch (error) {
                        if (error.response && error.response.data.status === 400) Swal.fire('Error', error.response.data.error, 'error');
                        else if (error.response && error.response.data.status === 401) {
                            //If token has expired.
                            Swal.fire('Error', error.response.data.error, 'error');
                            navigate('/login');
                        }
                        else Swal.fire('Error', `Algo ha salido mal:(, ${error}`, 'error');
                    }
                };
                //Call upload file.
                uploadFile();
            }
        })
    };

    const onChange = (event) => setFile(event.target.files[0]);

    return (
        <section className="pt-4 pb-5 container-xxl m-auto text-center my-5">
            <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>

                <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
                    <img className="file-image" src='/assets/uploadFile.png' alt="img" />
                </div>

                <div className="col-12 col-md-7">
                    <div className="text-container d-grid justify-content-center align-items-center m-auto" style={{ width: "75%", textAlign: "center" }}>
                        <h1 className="homepage-title fw-bold" style={{ fontSize: "3rem" }}>Selecciona un archivo</h1>
                        <p className="homepage-text my-5 pb-3" style={{ fontSize: "1.1rem" }}>
                            Busca entre tus archivos alguno para subir sus datos de <span className="text-info">{location.pathname.includes('energiaConsumida') ? 'energía consumida.' : 'energía generada.'}</span>
                        </p>
                        <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit(onSubmit)}>
                            <InputComponent className="col-12 mb-3" type="file" name="file" label="Archivo a cargar" placeholder="Selecciona un archivo"
                                handleChange={onChange} register={register} errors={errors} required={true}
                            />
                            <button className="btn-homepage btn mx-1" style={{ width: "30%", backgroundColor: "#3bbfe4" }}>Cargar archivo</button>
                        </form>
                        <p className="homepage-text my-5" style={{ fontSize: "1.1rem" }}>
                            <strong>Nota: </strong> Las columnas del archivo deben de ser: 'ar_number', 'fr_number', 'kwhr_number', 'sn_number', 'vr_number', 'wr_number' y 'created-date'.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}