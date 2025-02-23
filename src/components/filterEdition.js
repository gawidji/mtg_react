import "./css/filterColor.css"
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
    <div className="checkbox-editions">
     {editions.map(edition => (
       <li><input type="checkbox" name={"nom"+ edition} value={edition} onClick={props.onClick} checked={props.filterEditions.includes(edition)}/>
       {edition}</li>
    ))}
     <button onClick={props.onPush}>{props.text}</button>
    </div>

    )
}

export default CheckboxEdition