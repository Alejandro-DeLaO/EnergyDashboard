import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarComponent from "./NavBarComponent";
import HomePage from "../pages/HomePage";
import EnergyIndicator from "../pages/EnergyIndicator/EnergyIndicator";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DashboardPage from "../pages/DashboardPage";
import FooterComponent from "./FooterComponent";

export default function App() {
    return (
        <BrowserRouter>
            <NavBarComponent />

            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/indicador/:section" element={<EnergyIndicator />}/>
                <Route path="/dashboard" element={<DashboardPage />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />}/>

            </Routes>

            <FooterComponent/>
        </BrowserRouter>
    );
}