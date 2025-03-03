import { FaPencilAlt } from "react-icons/fa";
import "./css/buttonModif.css"

const ButtonModif = function (props) {
    return (
            <FaPencilAlt className="pencil-icon" onClick={props.onClick} />
    )
}

export default ButtonModif