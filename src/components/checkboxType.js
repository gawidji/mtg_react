import "./css/checkboxFormat.css"
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";




const CheckboxType = function (props) {

    const [types, setTypes] = React.useState([])

    useEffect(() => {
        const getTypes = async () => {
            try {
                const request = await axios.get(`http://localhost:8080/f_all/getTypes`);

                const response = request.data
    
                setTypes(response)

            }   
            catch (error) {
                console.log(error);
            }
        }
        getTypes();
        }, [types]);


    return (
        <div className="checkbox-container">
            {types.map(typical => (
            <li><input type="checkbox" name={"nom"+ typical} value={typical} onClick={props.onClick} 
            checked={props.filterType.includes(typical)}/>
            {typical}</li>
            ))}
        </div>

    )
}


export default CheckboxType