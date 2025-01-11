import "./css/checkboxColor.css"
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import Adress from '../model/Adress';




const CheckboxAdress = function () {

    const [adress, setAdress] = React.useState([])    

    useEffect(() => {
        const getAdress = async () => {
            try {

                
                const request = await axios.get(`http://localhost:8082/api/adress/getUserAdress?userId=1`);
                
                const response = request.data.map(
                    adress => new Adress (adress.id, adress.firstName, adress.lastName, adress.streetName,
                        adress.streetNameOptional, adress.postCode, adress.city, adress.countryCode, adress.country 
            ) )  
                    
                setAdress(response)

                console.log(request)

            }   
            catch (error) {
                console.log(error);
            }
        }
        getAdress();
        }, []);


    return (
    <div className="checkbox-adress">
        {adress.map(ad=>(<li><input type="checkbox" name={"nom"+ ad.name} value={ad.streetName}/>
            {ad.streetName}</li>))} 
    <p style={{color:'black'}}>Hello</p>
    </div>

    )
}

export default CheckboxAdress