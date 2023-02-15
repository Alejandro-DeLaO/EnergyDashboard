import React, { useState } from "react";
import { Data } from "../../utils/Data";
import { MoreData } from "../../utils/MoreData";
import { EvenMoreData } from "../../utils/EvenMoreData";
import GaugeChart from "../../components/GaugeChart";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";

export default function EnergyIndicatorV2(){
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
    const [Data2] = useState({
        labels: MoreData.map((data) => data.year),
        datasets: [
            {
                label: "Energia consumida ",
                data: MoreData.map((data) => data.userGain),
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
    return (
        <section>
            <div className="container-fluid col-12">
                <div className="row m-5">
                    <div className="col-12 justify-content-center">
                        <div className="card shadow text-center">
                            <div class="card-header ">
                                <h5>Energia consumida en edificio 1</h5>
                            </div>
                            <div className="card-body">
                                <GaugeChart></GaugeChart>
                            </div>
                            <div className="card-footer">
                                    <h1 style={{ color: "#edbd02" }}>50KWh</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center m-5">
                    <div className="col-12 col-lg-4">
                        <div className="card shadow text-center h-100">
                            <div className="card-body ">
                                <LineChart chartData={Data2}></LineChart>
                            </div>
                            <div className="card-footer">
                                    <p style={{fontSize: "1.3rem" }}>Ultima semana</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="card shadow text-center h-100">
                            <div className="card-body ">
                                <BarChart chartData={Data1}></BarChart>
                            </div>
                            <div className="card-footer">
                                    <p style={{fontSize: "1.3rem" }}>Energia consumida por edificio</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="card shadow text-center h-100">
                            <div className="card-body ">
                                <LineChart chartData={Data3}></LineChart>
                            </div>
                            <div className="card-footer">
                                    <p style={{fontSize: "1.3rem" }}>Gasto energetico estimado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
}