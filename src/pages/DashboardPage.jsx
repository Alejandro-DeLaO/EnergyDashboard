import React from "react";
import DoughnutChart from "../components/GaugeChart";

export default function DashboardPage(){
    return (
        <section>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center "}}>
                <h2 style={{position: "absolute", top: "100px"}}>Uso energetico</h2>
                <DoughnutChart />
                <p style={{position: "absolute", bottom: "50px", fontSize: "1.8rem", fontWeight: "bold"}}>237168741274 KW/h</p>
            </div>
        </section>
    );
}