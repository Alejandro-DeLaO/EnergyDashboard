import React, { useEffect, useState } from "react";
import { EvenMoreData } from "../../utils/EvenMoreData";
import GaugeChart from "../../components/GaugeChart";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import "./styles/cards-heights-v2.css"
import { Line } from "react-chartjs-2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CutSvg from "./components/CutSvg";
import * as energyConsumptionService from '../../services/EnergyConsumption';
import * as buildingService from '../../services/BuildingService';

export default function EnergyIndicator() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [currentBuildingName, setCurrentBuildingName] = useState();
    //Filtering by range of time.
    const [energyConsumptionsOfTheDay, setEnergyConsumptionsOfTheDay] = useState([]);
    const [energyConsumptionsOfTheWeek, setEnergyConsumptionsOfTheWeek] = useState([]);
    //Save total consumption by building.
    const [lastMonthTotalConsumptions, setLastMonthTotalConsumptions] = useState({
        labels: [],
        datasets: [
            {
                label: "Energia consumida ",
                data: [],
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 5,
                barThickness: 40,
            },
        ],
    });

    useEffect(() => {
        const getEnergyConsumptions = async () => {
            try {
                //Get and save total consumptions by building.
                const buildingsResponse = await buildingService.getBuildings();
                let buildings = buildingsResponse.data.data.buildings;

                //Get current building information.
                const auxPathname = location.pathname.split('/');
                const currentBuildingPathname = auxPathname[auxPathname.length - 1];

                //If building that comes in pathname does not exist into buildings, navigate to not found page.
                if (!buildings.some(building => building.name === currentBuildingPathname)) {
                    navigate('/pagina-no-encontrada');
                    return;
                }
                //Otherwise, find current building information.
                const currentBuilding = buildings.find(building => building.name === currentBuildingPathname);
                setCurrentBuildingName(currentBuilding.name);

                //Get filtering.
                const perDay = await energyConsumptionService.getEnergyConsumptionsPerDay({ building: currentBuilding._id, date: new Date('02/26/2023') });
                setEnergyConsumptionsOfTheDay(perDay.data.data.energyConsumptionsOfThatDay);

                const perWeek = await energyConsumptionService.getEnergyConsumptionsPerWeek(auth.token, { building: currentBuilding._id, date: new Date('02/20/2023') });
                setEnergyConsumptionsOfTheWeek(perWeek.data.data.energyConsumptionsOfThatWeek);

                //Iterate array and created objects with all buildings information.
                buildings.forEach(async building => {
                    //Get last day of last month information by a building.
                    const lastDayOfLastMonthResponse = await energyConsumptionService.getEnergyConsumptionsPerDay({ building: building._id, date: new Date('02/26/2023') });
                    const lastDayOfLastMonthData = lastDayOfLastMonthResponse.data.data.energyConsumptionsOfThatDay;
                    //And save last index of that array, if has information.
                    setLastMonthTotalConsumptions(prevValue => {
                        //Save buildings data.
                        const buildingsData = prevValue?.buildingsData?.length > 0
                            ? [...prevValue.buildingsData, { building, data: lastDayOfLastMonthData.length > 0 ? lastDayOfLastMonthData[lastDayOfLastMonthData.length - 1].kwhr : 0 }]
                            : [{ building, data: lastDayOfLastMonthData.length > 0 ? lastDayOfLastMonthData[lastDayOfLastMonthData.length - 1].kwhr : 0 }];
                        //And with that information create labels and datasets.
                        const labels = buildingsData.map(buildingData => buildingData.building.name);
                        const datasets = [{
                            label: "Energia consumida",
                            data: buildingsData.map((buildingData) => buildingData.data),
                            borderColor: "black",
                            borderWidth: 2,
                            borderRadius: 5,
                            barThickness: 40,
                        }];

                        return { ...prevValue, labels, datasets, buildingsData };
                    });
                });
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
    }, [location]);

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

    const lastDayPower = energyConsumptionsOfTheDay[0] ? (
        <Line
            data={{
                labels: (energyConsumptionsOfTheDay.map((data) => data.createdAt)).map((date) => new Date(date)),
                datasets: [
                    {
                        label: "Potencia",
                        data: energyConsumptionsOfTheDay.map((data) => data.wr),
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
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'week',
                            displayFormats: {
                                week: 'dd/MM'
                            }
                        },
                        grid: {
                            tickColor: 'rgba(75,192,192,1)',
                            color: 'rgba(75,192,192,1)'
                        },
                        ticks: {
                        }
                    },
                }
            }}
        />
    ) : null;

    const lastWeek = energyConsumptionsOfTheWeek[0] ? (
        <Line
            data={{
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
                scales: {
                    x: {
                        bounds: 'ticks',
                        offset: false,
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'MM/dd'
                            }
                        },
                        grid: {
                            offset: false,
                            tickColor: 'rgba(75,192,192,1)',
                            color: 'rgba(75,192,192,1)'
                        }
                    },
                }
            }}
        />
    ) : null;

    const today = energyConsumptionsOfTheDay[0] ? (
        <Line
            data={{
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
                scales: {
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
                            color: 'rgba(75,192,192,1)'
                        },
                        ticks: {
                            stepSize: 4
                        }
                    }
                }
            }}
        />
    ) : null;

    return (
        <section>
            <div className="container-fluid col-12">
                <div className="row d-flex justify-content-center m-5 mb-0">
                    <div className="col-12">
                        <div className="card shadow text-center h-100">
                            <div className="card-header ">
                                <h5>Energia consumida en edificio - {currentBuildingName}</h5>
                            </div>
                            <div className="card-body" id="gauge-card-body-dos">
                                <GaugeChart></GaugeChart>
                            </div>
                            <div className="card-footer">
                                <h1 style={{ color: "#edbd02" }}>50KWh</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center mx-5">
                    <div className="col-12 mt-5 col-lg-4">
                        <div className="card shadow text-center h-100">
                            <div className="card-body ">
                                {lastDayPower}
                            </div>
                            <div className="card-footer">
                                <p style={{ fontSize: "1.3rem" }}>Potencia de día anterior</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5 col-lg-4">
                        <div className="card shadow text-center h-100">
                            <div className="card-body ">
                                {lastWeek}
                            </div>
                            <div className="card-footer">
                                <p style={{ fontSize: "1.3rem" }}>Ultima semana</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5 col-lg-4">
                        <div className="card shadow text-center h-100">
                            <div className="card-body ">
                                {today}
                            </div>
                            <div className="card-footer">
                                <p style={{ fontSize: "1.3rem" }}>Hoy</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center m-5 mt-0">
                    <div className="col-12 col-lg-3 mt-5 d-flex flex-column">
                        {/* This is gonna be working with neural networks just wait for it. */}
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
                                <BarChart chartData={lastMonthTotalConsumptions}></BarChart>
                            </div>
                            <div className="card-footer">
                                <p style={{ fontSize: "1.3rem" }}>Consumo por edificio - mes anterior</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 mt-5">
                        <div className="card shadow text-center h-100">
                            <div className="card-body">
                                <CutSvg></CutSvg>
                            </div>
                            <div className="card-footer">
                                <p style={{ fontSize: "1.3rem" }}>Consumo de edificios</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}