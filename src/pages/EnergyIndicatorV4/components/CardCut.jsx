import React from "react";
import CutSvg from "../../EnergyIndicator/components/CutSvg";

function CardCut() {
    return(
      <div className="col-10 col-lg-10 my-2">
          <div className="card shadow-sm text-center h-100" style={{border: "none", borderRadius: "0"}}>
                <div className="card-body p-2">
                    <CutSvg></CutSvg>
                </div>
                <div className="">
                    <p style={{fontSize: "1.3rem" }}>Gasto por edificio</p>
                </div>
          </div>
      </div>
    );
} 

export default CardCut;