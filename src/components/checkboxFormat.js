import "./css/checkboxFormat.css"
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";




const CheckboxFormat = function (props) {

    const [formats, setFormats] = React.useState([])

    useEffect(() => {
        const getFormats = async () => {
            try {
                const request = await axios.get(`http://localhost:8080/f_all/getFormats`);

                const response = request.data
    
                setFormats(response)

            }   
            catch (error) {
                console.log(error);
            }
        }
        getFormats();
        }, [formats]); 


    return (
        <div className="checkbox-container">
            {formats.map(format => (
            <li><input type="checkbox" name={"nom"+ format} value={format} onClick={props.onClick} 
            checked={props.filterFormats.includes(format)}/>
            {format}</li>
            ))}
        </div>

    )
}


export default CheckboxFormat