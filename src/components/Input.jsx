import React from "react";

function Input(props){
  return(
    <div>
      <label className="col-sm-2 col-form-label pb-0 pt-1" style={{width: "100%"}}>{props.inputTitle}</label>
      <div className="col-sm-10 pb-3" style={{width: "100%"}}>
        <input type="{props.inputType}" className="form-control-plaintext" style={{borderBottom: "1px solid", borderTop: "0",borderColor: "black"}}/>
      </div>
    </div>
  );
}

export default Input;