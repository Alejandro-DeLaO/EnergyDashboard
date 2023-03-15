import React from "react";
import LoginForm from "./components/LoginForm";
import "../../styles/loginAndSignup.css";

export default function LoginPage() {
    return (
        <div className="page-container my-5" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "auto" }}>
            <div style={{ width: "100%" }}>
                <LoginForm />
            </div>
            <div className="register-img position-relative" style={{ width: "100%" }}>
                <img src='/assets/bg-6.jpg' alt="imagen" height="auto" width="100%" />
            </div>
        </div>
    );
}