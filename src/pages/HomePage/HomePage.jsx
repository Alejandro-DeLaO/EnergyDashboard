import React from "react";
import SectionComponent from "../../components/SectionComponent";
import '../../styles/homepage.css';
import useAuth from "../../hooks/useAuth";

export default function HomePage() {

    const { auth } = useAuth();

    const randomNum = Math.floor(Math.random() * 3 + 1);
    const randomImg = "/assets/homepageImg" + randomNum + ".png";

    return (
        <section className="pt-4 pb-5 row container-xxl m-auto">
            <div className="homepage-container mb-5" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="d-flex justify-content-center align-items-center m-auto" style={{ width: "100%", fontFamily: "jost" }}>
                    <div className="text-container d-grid justify-content-center align-items-center m-auto" style={{ width: "65%", textAlign: "center" }}>
                        <h1 className="homepage-title fw-bold" style={{ fontSize: "5rem" }}>ENERGÍA RENOVABLE</h1>
                        <p className="homepage-text" style={{ fontSize: "1rem", margin: "48px 0" }}>Las energías renovables se obtienen a partir de fuentes naturales de energía inagotables e indefinidas. Estas energias provienen de fuentes como el sol, el aire, el agua o la biomasa; todas ellas inagotables.</p>

                        <div className="btn-homepage-container d-flex align-items-center justify-content-center" >
                            <button type="button" className="btn-homepage btn mx-1" style={{ width: "30%", backgroundColor: "#3bbfe4" }}>Saber más...</button>
                            <button type="button" className="btn-homepage btn mx-1" style={{ width: "30%", backgroundColor: "#3bbfe4" }}>Noticias</button>
                        </div>
                    </div>
                </div>

                <div className="homepage-img-container d-flex align-items-center justify-content-center" style={{ width: "100%" }}>
                    <img className="homepage-img" src={randomImg} alt="img" style={{ height: "100%", width: "auto" }} />
                    {/* <p className="mt-2" style={{ fontSize: ".5rem" }}>Illustration by <a href="https://icons8.com/illustrations/author/iAdLsFJOKDrk">Tanya Krasutska</a> from <a href="https://icons8.com/illustrations">Ouch!</a></p> */}
                </div>
            </div>

            <div className="row d-flex justify-content-center section-container gap-3 m-auto mt-5">
                <SectionComponent to='/indicador/IER' img='/assets/linkImg1.png' text='Instituto de energias renovables' elevation='-20%' />
                <SectionComponent to='/indicador/CAE' img='/assets/linkImg2.png' text='Centro de atención a estudiantes' elevation='-25%' />
                <SectionComponent to='/indicador/Biblioteca' img='/assets/linkImg3.png' text='Biblioteca universitaria' elevation="-20%" />
                <SectionComponent to='/indicador/Salud' img='/assets/linkImg4.png' text='Ciencias de la salud' elevation="-20%" />
                {/* <SectionComponent to='/test' img='/assets/linkImg5.png' text='Monitoreo' elevation="-20%" /> */}
                {
                    auth?.user?.role === 'admin' && <SectionComponent to='/administrador' img='/assets/user.png' text='Administrador' elevation="-20%" marginL="25px" />
                }
            </div>
        </section>
    );
}