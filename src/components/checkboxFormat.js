import "./css/filterColor.css"
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
    <div className="checkbox-formats">
     {formats.map(format => (
       <li><input type="checkbox" name={"nom"+ format} value={format} onClick={props.onClick} 
       checked={props.filterFormats.includes(format)}/>
       {format}</li>
    ))}
     <button onClick={props.onClick2} disabled={props.disabled}>Valider</button>
    </div>

    )
}


export default CheckboxFormat