import React from "react";

function Cards(props) {
    return(
        <div className={props.className} style={{height: `${props.height}`}}>
            <div className="card shadow-sm text-center h-100" style={{border: "none", borderRadius: "0"}}>
                <div className="card-body" style={{height: "150px"}}>
                    {props.chart}
                </div>
                <div className="py-1">
                    <p className="m-auto" style={{ fontSize: "1.3rem" }}>{props.cardFooter}</p>
                </div>
            </div>
        </div>
    );
} 

export default Cards;