import React from "react";

export default function ShowError(props) {
    return (
        <div className="error-message">
            {props.text}
        </div>
    );
}