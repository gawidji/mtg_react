import "./css/checkboxColor.css"
import white from "../assets/white-mtg.png"
import blue from "../assets/blue-mtg.png"
import green from "../assets/green-mtg.png"
import red from "../assets/red-mtg.png"
import black from "../assets/black-mtg.png"







const CheckboxColor = function () {
    return (
    <div className="checkbox-colors">
       <li><input type="checkbox" name="color" value="blanc" /><img src={white} className="color-img" alt="white-logo" /></li>
       <li><input type="checkbox" name="color" value="bleu" /><img src={blue} className="color-img" alt="blue-logo" /></li>
       <li><input type="checkbox" name="color" value="vert" /><img src={green} className="color-img" alt="green-logo" /></li>
       <li><input type="checkbox" name="color" value="rouge" /><img src={red} className="color-img" alt="red-logo" /></li>
       <li><input type="checkbox" name="color" value="noir" /><img src={black} className="color-img" alt="black-logo" /></li>
    </div>

    )
}

export default CheckboxColor