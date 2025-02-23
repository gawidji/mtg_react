import "./css/filterColor.css"
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";



const CheckboxRarity = function (props) {

    const [rarities, setRarities] = React.useState([])

    useEffect(() => {
        const getRarities = async () => {
            try {
                const request = await axios.get(`http://localhost:8080/f_all/getRarities`);

                const response = request.data
    
                setRarities(response)

            }   
            catch (error) {
                console.log(error);
            }
        }
        getRarities();
        }, [rarities]);

    return (
        <div className="checkbox-rarities">
        {rarities.map(rarity => (
          <li><input type="checkbox" name={"nom"+ rarity} value={rarity} onClick={props.onClick} checked={props.filterRarities.includes(rarity)}/>
          {rarity}</li>
       ))}
        <button onClick={props.onPush}>{props.text}</button>
       </div>

    )
}
/*
<li><input type="checkbox" name={"fullColors"} onClick={props.Reset} checked={props.filterColors.length === 0}/> 
        <p>Toutes les couleurs</p>
        </li>
*/

export default CheckboxRarity