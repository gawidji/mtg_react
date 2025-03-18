import "./css/buttonIcon.css"

const buttonIcon = function (props) {
    return (
        <button className="buttonIcon" style={props.style} onClick={props.onClick}>{props.icon}
        </button>
                )  
}

export default buttonIcon