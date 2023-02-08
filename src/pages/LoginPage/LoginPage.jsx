import React from "react";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
    return (
        // <div style={{backgroundImage: `url(${bgimg})`, backgroundSize: "cover", height: "100vh"}}>
        <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
            <div className="m-auto pt-5" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "auto" }}>
                <div style={{ width: "100%" }}>
                    <LoginForm />
                </div>
                <div className="position-relative" style={{ width: "100%" }}>
                    <img src='/assets/bg-6.jpg' alt="imagen" height="auto" width="100%" />
                </div>
            </div>
        </div>
    );
}