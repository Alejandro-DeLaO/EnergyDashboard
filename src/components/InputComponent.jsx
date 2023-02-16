import React from "react";
import ShowError from "./ShowError";

export default function InputComponent(props) {

    const validatorsAndEvents = {};

    if (props.required) validatorsAndEvents.required = "Campo requerido.";
    if (props.pattern) validatorsAndEvents.pattern = props.pattern.pattern;
    if (props.maxLength) validatorsAndEvents.maxLength = props.maxLength.maxLength;
    if (props.minLength) validatorsAndEvents.minLength = props.minLength.minLength;
    if (props.handleChange) validatorsAndEvents.onChange = props.handleChange;

    return (
        <div className={props.className}>
            <label htmlFor={props.name} className="form-label">{props.label}</label>
            <input disabled={props.disabled ? props.disabled : false} type={props.type ? props.type : "text"} id={props.name} className={!props.errors[props.name] ? "form-control-plaintext" : "form-control-plaintext is-invalid"} placeholder={props.placeholder}
                {...(props.register(props.name, validatorsAndEvents))} style={{borderBottom: "1px solid", borderTop: "0",borderColor: "black"}}
            />
            {props.errors[props.name] && props.errors[props.name].type === 'required' && <ShowError text={props.errors[props.name].message} />}
            {props.errors[props.name] && props.errors[props.name].type === 'pattern' && <ShowError text={props.errors[props.name].message} />}
            {props.errors[props.name] && props.errors[props.name].type === 'maxLength' && <ShowError text={props.errors[props.name].message} />}
            {props.errors[props.name] && props.errors[props.name].type === 'minLength' && <ShowError text={props.errors[props.name].message} />}
        </div>
    );
}