import "./css/filterColor.css"
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
    <div className="checkbox-types">
     {types.map(type => (
       <li><input type="checkbox" name={"nom"+ type} value={type} onClick={props.onClick} checked={props.filterTypes.includes(type)}/>
       {type}</li>
    ))}
     <button onClick={props.onPush}>{props.text}</button>
    </div>

    )
}

export default CheckboxType