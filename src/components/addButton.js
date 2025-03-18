import "./css/addButton.css"

const AddButton = function (props) {
    return (
        <button className="addButton" style={props.style} onClick={props.onClick}>{props.icon}
        </button>
                )
}

export default AddButton 