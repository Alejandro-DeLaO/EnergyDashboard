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
import 'chartjs-adapter-date-fns';

export default function EnergyIndicator() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [currentBuildingName, setCurrentBuildingName] = useState();
    //New server info.
    const [todayEnergyInfo, setTodayEnergyInfo] = useState({});
    const [yesterdayPowerInfo, setYesterdayPowerInfo] = useState({});
    const [currentWeekInfo, setCurrentWeekInfo] = useState({});

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
                //Reset information to see when loading new one.
                if (todayEnergyInfo) {
                    setTodayEnergyInfo({});
                    setYesterdayPowerInfo({});
                    setCurrentWeekInfo({});
                }

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

                //Get last register from this monitor to know what was the last date registered in server and get information from that date.
                const lastRegister = await energyConsumptionService.getLastRegister(currentBuilding.uniqueId);
                const lastInfoDate = new Date(lastRegister.data.response['Modified Date']);
                const currentDate = new Date();

                let dateParam;

                //If lastInfoDate is lesser, then, send that date as param in next queries, otherwise send current date.
                if (currentDate > lastInfoDate) dateParam = lastInfoDate;
                else dateParam = currentDate;

                //Get month, day and year from dateParam.
                const monthDayYear = dateParam.toLocaleDateString('en-us').split('/');

                //Iterate array and created objects with all buildings information.
                buildings.forEach(async building => {
                    //Get last and first days data to get information.
                    let lastDayOfPreviousMonth = new Date(monthDayYear[2], monthDayYear[0] - 1, 0);
                    let firstDayOfCurrentMonth = new Date(monthDayYear[2], monthDayYear[0] - 1, 1);

                    //Get last day of last month information by a building.
                    let lastDayOfLastMonthResponse = await energyConsumptionService.getDataInARange(building.SN, lastDayOfPreviousMonth.toLocaleDateString('en-us'), firstDayOfCurrentMonth.toLocaleDateString('en-us'));
                    let lastDayOfLastMonthData = lastDayOfLastMonthResponse.data.response.results;

                    //If into gotten registers there are remaining yet, get them to get last one into that range of time.
                    if (lastDayOfLastMonthResponse.data.response.remaining !== 0) {
                        //Get information again and change cursor value.
                        lastDayOfLastMonthResponse = await energyConsumptionService.getDataInARange(building.SN, lastDayOfPreviousMonth.toLocaleDateString('en-us'), firstDayOfCurrentMonth.toLocaleDateString('en-us'), lastDayOfLastMonthResponse.data.response.cursor + lastDayOfLastMonthResponse.data.response.remaining);
                        //And spread accumulated info.
                        lastDayOfLastMonthData = [...lastDayOfLastMonthData, ...lastDayOfLastMonthResponse.data.response.results]
                    }

                    //And save last index of that array, if has information.
                    setLastMonthTotalConsumptions(prevValue => {
                        //Validate just 4 buildings, if length is 4, then restart buildings.
                        if (prevValue?.buildingsData?.length === 4) prevValue = undefined;

                        //Save buildings data.
                        const buildingsData = prevValue?.buildingsData?.length > 0
                            ? [...prevValue.buildingsData, { building, data: lastDayOfLastMonthData.length > 0 ? lastDayOfLastMonthData[lastDayOfLastMonthData.length - 1].kWhR : 0 }]
                            : [{ building, data: lastDayOfLastMonthData.length > 0 ? lastDayOfLastMonthData[lastDayOfLastMonthData.length - 1].kWhR : 0 }];
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

                //For getting a complete week information, get limits, first and last day of that week.
                let auxDate = new Date(dateParam);
                //Subtract 1 to get yesterday.
                auxDate.setDate(auxDate.getDate() - 1);
                let yesterday = new Date(auxDate);
                //Then add up 2 to get tomorrow.
                auxDate.setDate(auxDate.getDate() + 2);
                let tomorrow = new Date(auxDate);
                //And subtract 1 again to get initial auxDate as dateParam.
                auxDate.setDate(auxDate.getDate() - 1);

                let dayOfTheWeek = dateParam.getDay();
                let firstDayOfTheWeek = new Date(auxDate.setDate(auxDate.getDate() - (dayOfTheWeek - 1)));
                //To get last day, add up 6, but to get a correct range of data, sum 7 to get all information before that day.
                let lastDayOfTheWeek = new Date(auxDate.setDate(auxDate.getDate() + 7));

                //Get filtering.
                let infoPerDay = await energyConsumptionService.getDataInARange(currentBuilding.SN, dateParam.toLocaleDateString('en-us'), tomorrow.toLocaleDateString('en-us'));
                let completeDayInfo = infoPerDay.data.response.results;

                while (infoPerDay.data.response.remaining !== 0) {
                    //Get information again and change cursor value.
                    infoPerDay = await energyConsumptionService.getDataInARange(currentBuilding.SN, dateParam.toLocaleDateString('en-us'), tomorrow.toLocaleDateString('en-us'), infoPerDay.data.response.remaining > 100 ? infoPerDay.data.response.cursor + 100 : infoPerDay.data.response.cursor + infoPerDay.data.response.remaining);
                    //And spread accumulated info.
                    completeDayInfo = [...completeDayInfo, ...infoPerDay.data.response.results]
                }

                setTodayEnergyInfo({ data: completeDayInfo, date: infoPerDay.data.response.results[0]['Modified Date'] });

                let infoPerWeek = await energyConsumptionService.getDataInARange(currentBuilding.SN, firstDayOfTheWeek.toLocaleDateString('en-us'), lastDayOfTheWeek.toLocaleDateString('en-us'));
                let completeWeekInfo = infoPerWeek.data.response.results;

                while (infoPerWeek.data.response.remaining !== 0) {
                    //Get information again and change cursor value.
                    infoPerWeek = await energyConsumptionService.getDataInARange(currentBuilding.SN, firstDayOfTheWeek.toLocaleDateString('en-us'), lastDayOfTheWeek.toLocaleDateString('en-us'), infoPerWeek.data.response.remaining > 100 ? infoPerWeek.data.response.cursor + 100 : infoPerWeek.data.response.cursor + infoPerWeek.data.response.remaining);
                    //And spread accumulated info.
                    completeWeekInfo = [...completeWeekInfo, ...infoPerWeek.data.response.results]
                }

                setCurrentWeekInfo({ data: completeWeekInfo, startDate: firstDayOfTheWeek, endDate: lastDayOfTheWeek });

                let dayBeforePower = await energyConsumptionService.getDataInARange(currentBuilding.SN, yesterday.toLocaleDateString('en-us'), dateParam.toLocaleDateString('en-us'));
                let completeDayBeforePowerInfo = dayBeforePower.data.response.results;

                while (dayBeforePower.data.response.remaining !== 0) {
                    //Get information again and change cursor value.
                    dayBeforePower = await energyConsumptionService.getDataInARange(currentBuilding.SN, yesterday.toLocaleDateString('en-us'), dateParam.toLocaleDateString('en-us'), dayBeforePower.data.response.remaining > 100 ? dayBeforePower.data.response.cursor + 100 : dayBeforePower.data.response.cursor + dayBeforePower.data.response.remaining);
                    //And spread accumulated info.
                    completeDayBeforePowerInfo = [...completeDayBeforePowerInfo, ...dayBeforePower.data.response.results]
                }

                setYesterdayPowerInfo({ data: completeDayBeforePowerInfo, date: yesterday });

                /* 
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
                        //Validate just 4 buildings, if length is 4, then restart buildings.
                        if (prevValue?.buildingsData?.length === 4) prevValue = undefined;

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
                */
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

    const lastDayPower = yesterdayPowerInfo?.data ? (
        <Line
            data={{
                labels: (yesterdayPowerInfo.data.map((data) => data['Modified Date'])).map((date) => new Date(date)),
                //labels: (energyConsumptionsOfTheDay.map((data) => data.createdAt)).map((date) => new Date(date)),
                datasets: [
                    {
                        label: "Potencia",
                        data: yesterdayPowerInfo.data.map((data) => data.WR),
                        //data: energyConsumptionsOfTheDay.map((data) => data.wr),
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

    const lastWeek = currentWeekInfo?.data ? (
        //const lastWeek = energyConsumptionsOfTheWeek[0] ? (
        <Line
            data={{
                labels: (currentWeekInfo.data.map((data) => data['Modified Date'])).map((date) => new Date(date)),
                //labels: (energyConsumptionsOfTheWeek.map((data) => data.createdAt)).map((date) => new Date(date)),
                datasets: [
                    {
                        label: "Energia consumida ",
                        data: currentWeekInfo.data.map((data) => data.kWhR),
                        //data: energyConsumptionsOfTheWeek.map((data) => data.kwhr),
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

    const today = todayEnergyInfo?.data ? (
        //const today = energyConsumptionsOfTheDay[0] ? (
        <Line
            data={{
                labels: (todayEnergyInfo.data.map((data) => data['Modified Date'])).map((date) => new Date(date)),
                //labels: (energyConsumptionsOfTheDay.map((data) => data.createdAt)).map((date) => new Date(date)),
                datasets: [
                    {
                        label: "Energia consumida ",
                        data: todayEnergyInfo.data.map((data) => data.kWhR),
                        //data: energyConsumptionsOfTheDay.map((data) => data.kwhr),
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
                                <p style={{ fontSize: "1.3rem" }}>Potencia ayer {yesterdayPowerInfo?.date && new Date(yesterdayPowerInfo.date).toLocaleDateString('es-mx')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5 col-lg-4">
                        <div className="card shadow text-center h-100">
                            <div className="card-body ">
                                {lastWeek}
                            </div>
                            <div className="card-footer">
                                <p style={{ fontSize: "1.3rem" }}>Semana {currentWeekInfo?.startDate && `${new Date(currentWeekInfo.startDate).toLocaleDateString('es-mx')} - ${new Date(currentWeekInfo.endDate).toLocaleDateString('es-mx')}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5 col-lg-4">
                        <div className="card shadow text-center h-100">
                            <div className="card-body ">
                                {today}
                            </div>
                            <div className="card-footer">
                                <p style={{ fontSize: "1.3rem" }}>Hoy {todayEnergyInfo?.date && new Date(todayEnergyInfo.date).toLocaleDateString('es-mx')}</p>
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