import React from "react";
import SignupForm from "./components/SignupForm";

export default function SignUpPage() {
    return (
        <div className="page-container my-5 container-xxl" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "auto" }}>
            <div className="register-img position-relative" style={{ width: "100%"}}>
                <img src='/assets/bg-7.jpg' alt="imagen" height="auto" width="100%" />
            </div>
            <div style={{ width: "100%" }}>
                <SignupForm />
            </div>
        </div>
    );
}