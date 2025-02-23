import "./css/likeButton.css"

const LikeButton = function (props) {
    return (
        <button className="likeButton" onClick={props.onClick}>{props.icon}
        </button>
                )
}

export default LikeButton