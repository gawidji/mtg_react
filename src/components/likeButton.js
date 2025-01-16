import "./css/likeButton.css"
import { FaHeart, FaRegHeart  } from 'react-icons/fa';

const LikeButton = function (props) {
    return (
        <button className="likeButton" onClick={props.onClick}>{props.icon}
        </button>
                )
}

export default LikeButton