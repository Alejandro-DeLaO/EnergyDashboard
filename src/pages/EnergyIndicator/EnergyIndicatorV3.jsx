import React, { useEffect, useState } from "react";
import { Data } from "../../utils/Data";
import { MoreData } from "../../utils/MoreData";
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
                const perDay = await energyConsumptionService.getEnergyConsumptionsPerDay(auth.token, {building: '640a3ba618418225de453ef8', date: new Date('02/01/2023')});
                setEnergyConsumptionsOfTheDay(perDay.data.data.energyConsumptionsOfThatDay);

                const perWeek = await energyConsumptionService.getEnergyConsumptionsPerWeek(auth.token, {building: '640a3ba618418225de453ef8', date: new Date('02/01/2023')});
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
                            <BarChart chartData={Data1}></BarChart>
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Energia consumida por edificio</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-5 col-lg-3">
                    <div className="card shadow text-center h-100">
                        <div className="card-body ">
                            <LineChart chartData={Data3}></LineChart>
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Gasto energético estimado</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-5 col-lg-3">
                    <div className="card shadow text-center h-100">
                        <div className="card-body ">
                            <LineChart chartData={Data3}></LineChart>
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Gasto energético estimado</p>
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
                            <LineChart chartData={Data2}></LineChart>
                        </div>
                        <div className="card-footer">
                            <p style={{ fontSize: "1.3rem" }}>Ultima semana</p>
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