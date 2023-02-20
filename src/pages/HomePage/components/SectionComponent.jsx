import React from "react";
import { Link } from "react-router-dom";
import { scroll } from "../../../utils/scroll";

export default function SectionComponent(props) {
  
  const handleClick = () => scroll();

  return(
    <Link to={props.to} className="col-10 col-xl-3 col-lg-4 col-md-6 col-sm-8 p-0 section-card m-3 mb-4" onClick={handleClick} >
        <div className="card" style={{width: "auto"}}>
          <div className="cardContainer card-body d-flex align-items-end justify-content-center p-2" style={{ backgroundColor: "#6066f8", width: "100%" }}>
            <img className="linkImg" style={{ transform: `translateY(${props.elevation})` }} src={props.img} alt="img" height="160px" />
            <h5 className="linkText card-title fw-bold px-3" style={{ fontFamily: 'jost', fontSize: "1.8rem" }}>{props.text}</h5>
          </div>
        </div>
    </Link>
  );
}