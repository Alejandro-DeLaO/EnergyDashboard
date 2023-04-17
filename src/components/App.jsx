import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBarComponent from "./NavBarComponent";
import SideNavBarComponent from "./SideNavBarComponent";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";
import EnergyIndicator from "../pages/EnergyIndicator/EnergyIndicator";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DashboardPage from "../pages/DashboardPage";
import FooterComponent from "./FooterComponent";
import EnergyIndicatorV2 from "../pages/EnergyIndicator/EnergyIndicatorV2";
import CommentPage from "../pages/CommentPage/CommentsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
// import EnergyIndicatorV3 from "../pages/EnergyIndicator/EnergyIndicatorV3";
// import EnergyIndicatorV4 from "../pages/EnergyIndicatorV4/EnergyIndicatorV4";
// import EnergyIndicatorV5 from "../pages/EnergyIndicatorV4/EnergyIndicatorV5";

//Tables
import UsersTablePage from "../pages/CRUDTablePage/UsersTable/UsersTablePage";
import BuildingsTablePage from "../pages/CRUDTablePage/BuildingsTable/BuildingsTablePage";
import EnergyConsumptionPage from "../pages/CRUDTablePage/EnergyConsumptionPage";
import GeneratedEnergyPage from "../pages/CRUDTablePage/GeneratedEnergyPage";

//Context
import { AuthProvider } from "../context/AuthProvider";
import RequiredAuth from "./RequireAuth";

import AdministratorPage from "../pages/AdministratorPage/AdministratorPage";
import AdministratorIndex from "../pages/AdministratorPage/components/AdministratorIndex";
import DataManipulationPage from "../pages/AdministratorPage/DataManipulationPage/DataManipulationPage";

import UploadFileComponent from "../pages/AdministratorPage/components/UploadFileComponent";
import UploadDataIndexComponent from "../pages/AdministratorPage/components/UploadDataIndexComponent";

export default function App() {
    return (
        <BrowserRouter>

            <AuthProvider>
                {/* <NavBarComponent /> */}
                <SideNavBarComponent />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/indicador/:section" element={<EnergyIndicator />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/test" element={<EnergyIndicatorV2 />} />
                    <Route path="/comentarios" element={<CommentPage />} />
                    <Route path="/perfil" element={<ProfilePage />} />

                    <Route element={<RequiredAuth allowedRoles={['admin']} />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>

                    <Route element={<RequiredAuth allowedRoles={['admin']} />}>
                        <Route path="/administrador" element={<AdministratorPage />}>

                            <Route index element={<AdministratorIndex />} />
                            <Route path="subirDatos" element={<UploadDataIndexComponent />} />
                            <Route path="subirDatos/:type" element={<UploadFileComponent />} />

                            <Route path="manipularDatos" element={<DataManipulationPage />} />
                            <Route path="manipularDatos/usuarios" element={<UsersTablePage />} />
                            <Route path="manipularDatos/edificios" element={<BuildingsTablePage />} />
                            <Route path="manipularDatos/consumoEnergetico" element={<EnergyConsumptionPage />} />
                            <Route path="manipularDatos/energiaGenerada" element={<GeneratedEnergyPage />} />

                        </Route>
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />

                </Routes>

                <FooterComponent />
            </AuthProvider>

        </BrowserRouter>
    );
}