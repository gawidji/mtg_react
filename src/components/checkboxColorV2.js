import "./css/checkboxColor.css"
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import white from "../assets/white-mtg.png"
import blue from "../assets/blue-mtg.png"
import green from "../assets/green-mtg.png"
import red from "../assets/red-mtg.png"
import black from "../assets/black-mtg.png"



const CheckboxColorV2 = function (props) {

    const [colors, setColors] = React.useState([])

    useEffect(() => {
        const getColors = async () => {
            try {
                const request = await axios.get(`http://localhost:8080/f_all/getColors`);

                const response = request.data
    
                setColors(response)
                   
                   console.log(colors)


            }   
            catch (error) {
                console.log(error);
            }
        }
        getColors();
        }, []);

        const getColorPics = (value) => {
            if(value == "BLANC") {
                return white
            }
            if(value == "BLEU") {
                return blue
            }
            if(value == "VERT") {
                return green
            }
            if(value == "ROUGE") {
                return red
            }
            if(value == "NOIR") {
                return black
            }
            if(value == "INCOLORE") {
                return null
            }
           
        };

    return (
    <div className="checkbox-colors">
     {colors.map(color => (
       <li><input type="checkbox" name={"nom"+ color} value={color} onClick={props.onClick} checked={props.filterColors.includes(color)}/>
       <img src={getColorPics(color)} className="color-img" alt={color}/></li>
    ))}
    </div>

    )
}

export default CheckboxColorV2