import "./css/filterColor.css"
import React from 'react';
import { useEffect } from 'react';
import axios from "axios";




const CheckboxActivity = function (props) {

    const [activities, setActivities] = React.useState([])

    useEffect(() => {
        const getActivities = async () => {
            try {
                const request = await axios.get(`http://localhost:8080/f_all/getActivities`);

                const response = request.data
    
                setActivities(response)

            }   
            catch (error) {
                console.log(error);
            }
        }
        getActivities();
        }, [activities]);


    return (
    <div className="checkbox-activities">
     {activities.map(activity => (
       <li><input type="checkbox" name={"nom"+ activity} value={activity} onClick={props.onClick} 
       checked={props.filterActivities.includes(activity)}/>
       {activity}</li>
    ))}
     <button onClick={props.onPush}>{props.text}</button>
    </div>

    )
}

export default CheckboxActivity