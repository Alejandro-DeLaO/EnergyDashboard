import React, { useState } from "react";
import { Data } from "../../utils/Data";
import GaugeChart from "../../components/GaugeChart";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import Carousel from "react-bootstrap/Carousel";
import './styles/cards-heights.css'



export default function EnergyIndicator(){
    const [chartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Energia consumida ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "#009a60",
                    "#92b73a",
                    "#edbd02",
                    "#fc6114",
                    "#ed0022",
                ],
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 5,
                barThickness: 40,
            },
        ],
    });


    return(
        <div className="container-fluid col-12">
            <div className="row row-cols-2">
                <div className="col-12 d-flex flex-column justify-content-center col-md-5 col-xl-3">
                    <div className="card mt-3 w-100 shadow text-center"  id="top-left-card" >
                        <div class="card-header ">
                            <h5>Energia consumida en edificio 1</h5>
                        </div>
                        <div className="card-body ">
                             <GaugeChart></GaugeChart>
                        </div>
                        <div className="card-footer">
                                <h1 style={{ color: "#edbd02" }}>50KWh</h1>
                        </div>
                    </div>
                    <div className="card mt-3 w-100 shadow" id="bottom-left-card">
                    <div class="card-header text-center">
                        <h5>Energia consumida por edificio</h5>
                    </div>
                        <div className="card-body">
                            <HorizontalBarChart chartData={chartData}></HorizontalBarChart>
                        </div>
                    </div> 
                </div>
                <div className="col-12 d-flex flex-column justify-content-center col-md-7 col-xl-9">
                    <div className="card mt-3 w-100 shadow" id="top-right-card">
                        <video controls>
                        </video>
                    </div>
                    <div className="card mt-3  w-100 shadow" id="bottom-right-card">
                        <Carousel
                                            variant="dark"
                                            controls={false}
                                            indicators={false}
                                            interval={3000}
                                        >
                                            <Carousel.Item>
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "12rem",
                                                        overflow: "hidden",
                                                        display: "block",
                                                    }}
                                                ></div>
                                                <Carousel.Caption>
                                                    <h3>First slide label</h3>
                                                    <p>
                                                        Nulla vitae elit libero, a pharetra augue mollis
                                                        interdum.
                                                    </p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "12rem",
                                                        overflow: "hidden",
                                                        display: "block",
                                                    }}
                                                ></div>
                                                <Carousel.Caption>
                                                    <h3>Second slide label</h3>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                        elit.
                                                    </p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "12rem",
                                                        overflow: "hidden",
                                                        display: "block",
                                                    }}
                                                ></div>
                                                <Carousel.Caption>
                                                    <h3>Third slide label</h3>
                                                    <p>
                                                        Praesent commodo cursus magna, vel scelerisque nisl
                                                        consectetur.
                                                    </p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div> 
            </div>
        </div>


    );



}