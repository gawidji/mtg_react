import "./css/buttonValid.css"
import React from 'react';




const ButtonValid = function (props) {


    return (
    
        <div className="button-container">
            <button className="button-valid" onClick={props.onClick} disabled={props.disabled}>{props.text}</button>
        </div>

    )
} 


export default ButtonValid