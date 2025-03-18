import "./css/inputNumber.css"
import React from 'react';





const InputManaCoast = function (props) {

    return (
    <div className="input-number">
        <input type="number" placeholder={props.placeholder} onChange={props.onChange} step="1" min="0" />
    </div>

    )
}


export default InputManaCoast