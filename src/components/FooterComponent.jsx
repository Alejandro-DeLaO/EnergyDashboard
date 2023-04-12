import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css"

export default function FooterComponent() {
    return (
        <footer>
            <div className="container-xxl">
                <div className="row d-flex justify-content-center py-5 set-text">
                    <div className="col-sm d-flex flex-column align-items-center justify-content-center">
                        <Link className="text-decoration-none text-center">
                            <i className="fa-solid fa-circle-info"></i>
                            <h4>Información</h4>
                        </Link>
                        <p className="footer-list-item pt-4">Sobre nosotros</p>
                        <p className="footer-list-item">Contáctanos</p>
                    </div>
                </div>

                <hr />

                <div className="d-flex align-items-center">
                    <p className="fw-bolder">&#169; 2023 Cutonalá.</p>
                </div>
            </div>
        </footer>
    );
}