import React from "react";
import CardCut from "./components/CardCut";
import EnergyIndicatorV4 from "./EnergyIndicatorV4";


function EnergyIndicatorV5() {
    return(
        <section className="container-xxl" style={{backgroundColor: "#f8f8f8"}}>
            <div className="d-flex align-items-center justify-content-center">
                <CardCut />
            </div>
            <div>
                <EnergyIndicatorV4 />
            </div>
        </section>
    );
}

export default EnergyIndicatorV5;