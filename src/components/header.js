import "./css/header.css"
import LogoMTG from "../assets/LogoMTG.png"

const Header = function (props) {
    return (
        <header className="header">
            <img src={LogoMTG} alt="logo-mtg" />
            <div>{props.child}</div>
        </header>
    )
}

// Des variables TS inscritent dans Node exigent d'intégrer les fichiers png de cette manière 

export default Header