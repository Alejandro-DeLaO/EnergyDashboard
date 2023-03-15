import React, { useEffect, useState } from "react";
import { Data } from "../../utils/Data";
import { EvenMoreData } from "../../utils/EvenMoreData";
import GaugeChart from "../../components/GaugeChart";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import CutSvg from "./components/CutSvg";
import "./styles/cards-heights-v3.css"
import * as photovoltaicGenerationService from '../../services/PhotovoltaicGeneration';
import * as energyConsumptionService from '../../services/EnergyConsumption';
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

export default function EnergyIndicatorV3() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const [photovoltaicGenerations, setPhotovoltaicGenerations] = useState([]);
    const [energyConsumptions, setEnergyConsumptions] = useState([]);

    //Filtering by range of time.
    const [energyConsumptionsOfTheDay, setEnergyConsumptionsOfTheDay] = useState([]);
    const [energyConsumptionsOfTheWeek, setEnergyConsumptionsOfTheWeek] = useState([]);
    const [energyConsumptionsOfTheMonth, setEnergyConsumptionsOfTheMonth] = useState([]);

    useEffect(() => {
        const getEnergyConsumptions = async () => {
            try {
                const response = await energyConsumptionService.getEnergyConsumptions(auth.token, {building: '640a3ba618418225de453ef8'});
                setEnergyConsumptions(response.data.data.energyConsumptions);

                //Get filtering.
                const perDay = await energyConsumptionService.getEnergyConsumptionsPerDay(auth.token, {building: '640a3ba618418225de453ef8', date: new Date('02/26/2023')});
                setEnergyConsumptionsOfTheDay(perDay.data.data.energyConsumptionsOfThatDay);

                const perWeek = await energyConsumptionService.getEnergyConsumptionsPerWeek(auth.token, {building: '640a3ba618418225de453ef8', date: new Date('02/20/2023')});
                setEnergyConsumptionsOfTheWeek(perWeek.data.data.energyConsumptionsOfThatWeek);

                const perMonth = await energyConsumptionService.getEnergyConsumptionsPerMonth(auth.token, {building: '640a3ba618418225de453ef8', date: new Date('02/01/2023')});
                setEnergyConsumptionsOfTheMonth(perMonth.data.data.energyConsumptionsOfThatMonth);

            } catch (error) {
                if (error.response && error.response.data.status === 400) Swal.fire('Error', error.response.data.error, 'error');
                else if (error.response && (error.response.data.status === 401 || error.response.data.status === 403)) {
                    //If token has expired.
                    Swal.fire('Error', error.response.data.error, 'error');
                    navigate('/login');
                }
                else Swal.fire('Error', `Algo ha salido mal:(, ${error}`, 'error');
            }
        };
        //Call both function.
        getEnergyConsumptions();
    }, []);

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

    const lastMonthGraph = energyConsumptionsOfTheMonth[0] ? (
        <Line
            data = {{
                labels: (energyConsumptionsOfTheMonth.map((data) => data.createdAt)).map((date) => new Date(date)),
                datasets: [
                    {
                        label: "Energia consumida ",
                        data: energyConsumptionsOfTheMonth.map((data) => data.kwhr),
                        borderColor: "blue",
                        backgroundColor: "rgba(21, 209, 255, 0.4)",
                        borderWidth: 1,
                        fill: true,
                        pointRadius: 0
                    },
                ],
            }}
            options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
                scales:{
                    x: {
                        type: 'time',
                        time: {
                          unit: 'week',
                          displayFormats:{
                              week: 'dd/MM'
                          }
                        },
                        grid: {
                          tickColor: 'rgba(75,192,192,1)',
                          color : 'rgba(75,192,192,1)'
                        },
                        ticks:{
                        }
                      },
                }
              }}
        />    
    ) : null;
    console.log(lastMonthGraph)
    
    const lastWeek = energyConsumptionsOfTheWeek[0] ? (
        <Line
            data = {{
                labels: (energyConsumptionsOfTheWeek.map((data) => data.createdAt)).map((date) => new Date(date)),
                datasets: [
                    {
                        label: "Energia consumida ",
                        data: energyConsumptionsOfTheWeek.map((data) => data.kwhr),
                        borderColor: "blue",
                        backgroundColor: "rgba(21, 209, 255, 0.4)",
                        borderWidth: 1,
                        fill: true,
                        pointRadius: 0
                    },
                ],
            }}
            options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
                scales:{
                    x: {
                      bounds: 'ticks',
                      offset: false,
                      type: 'time',
                      time: {
                        unit: 'day',
                        displayFormats:{
                            day: 'MM/dd'
                        }
                      },
                      grid: {
                        offset: false,
                        tickColor: 'rgba(75,192,192,1)',
                        color : 'rgba(75,192,192,1)'
                      }
                    },
                }
              }}
        />    
    ) : null;
       
    const lastDay = energyConsumptionsOfTheDay[0] ? (
        <Line
            data = {{
                labels: (energyConsumptionsOfTheDay.map((data) => data.createdAt)).map((date) => new Date(date)),
                datasets: [
                    {
                        label: "Energia consumida ",
                        data: energyConsumptionsOfTheDay.map((data) => data.kwhr),
                        borderColor: "blue",
                        backgroundColor: "rgba(21, 209, 255, 0.4)",
                        borderWidth: 1,
                        fill: true,
                        pointRadius: 0
                    },
                ],
            }}
            options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
                scales:{
                    x: {
                        bounds: 'ticks',
                        offset: false,
                        type: 'time',
                        time: {
                          unit: 'hour',
                        },
                        grid: {
                          offset: false,
                          tickColor: 'rgba(75,192,192,1)',
                          color : 'rgba(75,192,192,1)'
                        },
                        ticks:{
                          stepSize: 4
                        }
                    }
                }
              }}
        />    
    ) : null;

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
            <div className="row d-flex justify-content-center mx-5">
                <div className="col-12 mt-5 col-lg-3">
                    <div className="card shadow text-center h-100">
                        <div className="card-header ">
                            <h5>Energia consumida en edificio 1</h5>
                        </div>
                        <div className="card-body" id="gauge-card-body">
                            <GaugeChart />
                        </div>
                        <div className="card-footer">
                            <h1 style={{ color: "#edbd02" }}>50KWh</h1>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-5 col-lg-3">
                    <div className="card shadow text-center h-100">
                        <div className="card-body ">
                            {lastMonthGraph}
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Ultimo mes</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-5 col-lg-3">
                    <div className="card shadow text-center h-100">
                        <div className="card-body ">
                            {lastWeek}
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Ultima semana</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-5 col-lg-3">
                    <div className="card shadow text-center h-100">
                        <div className="card-body ">
                            {lastDay}
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Dia anterior</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center m-5 mt-0">
                <div className="col-12 col-lg-3 mt-5 d-flex flex-column">
                    <div className="card shadow text-center h-100">
                        <div className="card-body ">
                            <LineChart chartData={Data3}></LineChart>
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Gasto energético estimado</p>
                        </div>
                    </div>
                    <div className="card mt-3 shadow text-center h-100">
                        <div className="card-body ">
                            <BarChart chartData={Data1}></BarChart>
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Energia consumida por edificio</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-9 mt-5">
                    <div className="card shadow text-center h-100">
                        <div className="card-body">
                            <CutSvg></CutSvg>
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Gasto por edificio</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}