import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideNavBarComponent from "./SideNavBarComponent";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";
import EnergyIndicator from "../pages/EnergyIndicator/EnergyIndicator";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import FooterComponent from "./FooterComponent";
import CommentPage from "../pages/CommentPage/CommentsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

//Context
import { AuthProvider } from "../context/AuthProvider";
import RequiredAuth from "./RequireAuth";
 
import AdministratorPage from "../pages/AdministratorPage/AdministratorPage";
import AdministratorIndex from "../pages/AdministratorPage/components/AdministratorIndex";
import UsersTablePage from "../pages/CRUDTablePage/UsersTable/UsersTablePage";
import BuildingsTablePage from "../pages/CRUDTablePage/BuildingsTable/BuildingsTablePage";

export default function App() {
    return (
        <BrowserRouter>

            <AuthProvider>
            
                <SideNavBarComponent />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/indicador/:building/:uniqueId" element={<EnergyIndicator />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/comentarios" element={<CommentPage />} />
                    <Route path="/perfil" element={<ProfilePage />} />

                    <Route element={<RequiredAuth allowedRoles={['admin']} />}>
                        <Route path="/administrador" element={<AdministratorPage />}>
                            <Route index element={<AdministratorIndex />} />
                            <Route path="/administrador/usuarios" element={<UsersTablePage />} />
                            <Route path="/administrador/edificios" element={<BuildingsTablePage />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />

                </Routes>

                <FooterComponent />
            </AuthProvider>

        </BrowserRouter>
    );
}