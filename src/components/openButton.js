import "./css/openButton.css"

const OpenButton = function (props) {
    return (
        <button className="openButton" onClick={props.onClick}>
            <span className="button-text">{props.text}</span>
            <span className="button-icon">{props.icon}</span>
        </button>
                )
}

export default OpenButton