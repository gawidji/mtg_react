import "./css/checkboxFormat.css"
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
        <div className="checkbox-container">
            {rarities.map(rarity => (
            <li><input type="checkbox" name={"nom"+ rarity} value={rarity} onClick={props.onClick} 
            checked={props.filterRarity.includes(rarity)}/>
            {rarity}</li>
            ))}
        </div>

    )
}


export default CheckboxRarity