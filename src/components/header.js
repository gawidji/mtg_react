import "./css/header.css"
import LogoMTG from "../assets/LogoMTG.png"
import { FiMenu } from "react-icons/fi";


const Header = function (props) { 
    return (
        <header className="header">
            <div className="menu"><FiMenu className="icon-menu" color="white"/></div>
            <img src={LogoMTG} className="img" alt="logo-mtg"/>
            <div className="nav-bar">{props.child}</div>
            
        </header>
    )
}

// Des variables TS inscritent dans Node exigent d'intégrer les fichiers png de cette manière 

export default Header