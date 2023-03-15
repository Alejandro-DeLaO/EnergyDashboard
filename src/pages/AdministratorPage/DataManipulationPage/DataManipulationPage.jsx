import React from "react";
import SectionComponent from "../../../components/SectionComponent";

export default function DataManipulationPage() {
    return(
        <section className="pt-4 pb-5 row container-xxl m-auto text-center mb-5">
            <h1 className="homepage-title fw-bold mt-3" style={{ fontSize: "3.5rem" }}>Manipula la información</h1>
            <p className="homepage-text mb-4" style={{ fontSize: "1rem" }}>Analiza, edita, elimina o crea nueva información para la página</p>

            <div className="row d-flex justify-content-center section-container gap-3 m-auto my-5">
                <SectionComponent to='/administrador' img='/assets/lowBattery.png' text='Consumo de energia' elevation="-15%" marginL="" />
                <SectionComponent to='/administrador' img='/assets/generatedEnergy.png' text='Energía generada' elevation="-25%" marginL="" />
                <SectionComponent to='/administrador/subirDatos/energiaGenerada' img='/assets/buildings.png' text='Edificios' elevation="-20%" marginL="40px" />
                <SectionComponent to='/administrador/subirDatos/' img='/assets/adminIcon_users.png' text='Usuarios' elevation="-30%" marginL="" />
            </div>
        </section>
    );
}
