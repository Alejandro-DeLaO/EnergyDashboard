import React, { useState } from "react";
import Cards from "./components/Cards";

import { Data } from "../../utils/Data";
import { EvenMoreData } from "../../utils/EvenMoreData";
import BarChart from "../../components/BarChart";
import GaugeChart from "../../components/GaugeChart";
import LineChart from "../../components/LineChart";


function EnergyIndicatorV4() {
    const [Data1] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Energia consumida ",
                data: Data.map((data) => data.userGain),
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 5,
                barThickness: 40,
            },
        ],
    });
    const [Data3] = useState({
        labels: EvenMoreData.map((data) => data.year),
        datasets: [
            {
                label: "Energia consumida ",
                data: EvenMoreData.map((data) => data.userGain),
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 5,
                barThickness: 40,
            },
        ],
    });

    return(
        <section className="container-xxl" style={{backgroundColor: "#f8f8f8"}}>
            <div className="row row-cols-md-2 d-flex justify-content-center">
                <Cards height="300px" className="col-10 my-3 col-md-6 col-lg-7" chart={ <BarChart chartData={Data1} /> } cardFooter="Energia consumida por edificio" />
                <Cards height="300px" className="col-10 my-3 col-md-4 col-lg-3" chart={ <GaugeChart /> } cardFooter="Energia consumida en el plantel" />
            </div>
            <div className="row row-cols-md-2 d-flex justify-content-center">
                <Cards height="300px" className="col-10 my-3 col-lg-5" chart={ <LineChart chartData={Data3}></LineChart> } cardFooter="Pico de gasto energetico de la ultima semana" />
                <Cards height="300px" className="col-10 my-3 col-lg-5" chart={ <LineChart chartData={Data3}></LineChart>  } cardFooter="Gasto energetico estimado" />
            </div>
        </section>
    );
}

export default EnergyIndicatorV4;