import "./css/checkboxFormat.css"
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";




const CheckboxEdition = function (props) {

    const [editions, setEditions] = React.useState([])

    useEffect(() => {
        const getEditions = async () => {
            try {
                const request = await axios.get(`http://localhost:8080/f_all/getEditions`);

                const response = request.data
    
                setEditions(response)

            }   
            catch (error) {
                console.log(error);
            }
        }
        getEditions();
        }, [editions]);


    return (
        <div className="checkbox-container">
            {editions.map(edition => (
            <li><input type="checkbox" name={"nom"+ edition} value={edition} onClick={props.onClick} 
            checked={props.filterEdition.includes(edition)}/>
            {edition}</li>
            ))}
        </div>

    )
}


export default CheckboxEdition