import React from "react";
import { Link } from "react-router-dom";
import '../styles/homepage.css'

function SectionComponent(props) {
    return (
        <Link to={props.to} className="col-12 col-sm-5 col-xl-3 section-card">
            <i className={props.icon} style={{ fontSize: '4rem' }} />
            <p className="m-0 mt-3 fw-bolder">{props.text}</p>
        </Link>
    );
}

export default function HomePage() {

    return (
        <section>
            <img className="w-100" src='/assets/edificio.png' alt="edificio.png"/>
            <div className="row d-flex justify-content-center section-container gap-3 m-5">
                <SectionComponent to='/indicador/instituto-energias-renovables' icon='fa-solid fa-solar-panel' text='Instituto de energias renovables' />
                <SectionComponent to='/indicador/centro-atencion-estudiantes' icon='fa-solid fa-school' text='Centro de atención a estudiantes' />
                <SectionComponent to='/indicador/biblioteca' icon='fa-solid fa-book' text='Biblioteca universitaria' />
                <SectionComponent to='/indicador/ciencias-salud' icon='fa-solid fa-notes-medical' text='Ciencias de la salud' />
                <SectionComponent to='/dashboard' icon='fa-solid fa-chart-line' text='Monitores' />
            </div>
        </section>
    );
}