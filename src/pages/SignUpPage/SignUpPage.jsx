import React from "react";
import SignupForm from "./components/SignupForm";

export default function SignUpPage() {
    return (
        // <div style={{backgroundImage: `url(${bgimg})`, backgroundSize: "cover", height: "100vh"}}>
        <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
            <div className="m-auto pt-5" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "auto" }}>
                <div className="position-relative" style={{ width: "100%", paddingLeft: "50px" }}>
                    <img src='/assets/bg-7.jpg' alt="imagen" height="auto" width="100%" />
                </div>
                <div style={{ width: "100%", paddingRight: "20px" }}>
                    <SignupForm />
                </div>
            </div>
        </div>
    );
}