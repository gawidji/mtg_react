import "./css/inputName.css"


 const InputName = function (props) {
    return (
            <input className="input-name" type="name" id="name" name="name" onChange={props.onChange}required/>

            )
}

export default InputName