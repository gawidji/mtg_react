import "./css/likeButton.css"

const AddButton = function (props) {
    return (
        <button className="addButton" onClick={props.onClick}>{props.icon}
        </button>
                )
}

export default AddButton