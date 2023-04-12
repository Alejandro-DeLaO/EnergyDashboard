import React from "react";
import { UserProvider } from "../../../context/UsersContext";
import UsersTableSection from "./components/UsersTableSection";

export default function UsersTablePage() {
    return(
        <UserProvider>
            <UsersTableSection />
        </UserProvider>
    );
}