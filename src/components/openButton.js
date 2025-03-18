import "./css/openButton.css"

const OpenButton = function (props) {
    const { onClick, text, icon, width } = props;

    return (
        <button className={props.className}  style={{ width: width }} onClick={onClick}>
            <span className="button-text">{text}</span>
            <span className="button-icon">{icon}</span>
        </button>
                ) 
}

export default OpenButton