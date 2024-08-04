import "./header.css"
import "../assets/LogoMTG.png"

const Header = function (props) {
    return (
        <header className="header">
            <img src="../assets/LogoMTG.png" alt="logo-mtg" />
            <div>{props.child}</div>
        </header>
    )
}

export default Header