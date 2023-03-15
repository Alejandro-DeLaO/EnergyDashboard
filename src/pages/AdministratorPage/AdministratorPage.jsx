import React from "react";
import SectionComponent from "../../components/SectionComponent";

export default function AdministratorPage() {
    return(
        <section className="pt-4 pb-5 row container-xxl m-auto text-center mb-5">
            <h1 className="homepage-title fw-bold mt-3" style={{ fontSize: "3.5rem" }}>¿Qué deseas hacer con los datos?</h1>
            <p className="homepage-text mb-4" style={{ fontSize: "1rem" }}>Sube nueva información acerca de la energía consumida o generada o manipula la información existente</p>

            <div className="row d-flex justify-content-center section-container gap-3 m-auto my-5">
                <SectionComponent to='/administrador' img='/assets/uploadData.png' text='Subir archivos' elevation="-25%" marginL="50px" />
                <SectionComponent to='/administrador/subirDatos/energiaGenerada' img='/assets/editData.png' text='Manipular información' elevation="-30%" marginL="20px" />
            </div>
        </section>
    );
}

