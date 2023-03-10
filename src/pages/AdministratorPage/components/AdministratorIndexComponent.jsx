import React from "react";
import SectionComponent from "../../HomePage/components/SectionComponent";

export default function AdministratorIndexComponent() {
    return (
        <section>
            <h1 className="homepage-title fw-bold mt-3" style={{ fontSize: "4rem" }}>Subir datos</h1>
            <p className="homepage-text mb-4" style={{ fontSize: "1.1rem" }}>Selecciona una opción para la información que deseas subir.</p>

            <div className="row d-flex justify-content-center section-container gap-3 m-auto my-5">
                <SectionComponent to='/administrador/subirDatos/energiaConsumida' img='/assets/energyConsumption.png' text='Energía consumida' elevation="-20%" />
                <SectionComponent to='/administrador/subirDatos/energiaGenerada' img='/assets/photovoltaicGeneration.png' text='Energia generada' elevation="-20%" />
            </div>
        </section>
    );
}