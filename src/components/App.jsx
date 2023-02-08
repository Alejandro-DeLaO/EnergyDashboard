import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarComponent from "./NavBarComponent";
import FooterComponent from "./FooterComponent";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DashboardPage from "../pages/DashboardPage";

export default function App() {
    return (
        <BrowserRouter>
            <NavBarComponent />

            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />}/>

            </Routes>

            <FooterComponent />
        </BrowserRouter>
    );
}