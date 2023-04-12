import React from "react";
import { BuildingProvider } from "../../../context/BuildingContext";
import BuildingsTableSection from "./components/BuildingsTableSection";

export default function BuildingsTableMainPage() {
    return(
        <BuildingProvider>
            <BuildingsTableSection />
        </BuildingProvider>
    );
}