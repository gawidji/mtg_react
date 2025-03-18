import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import User from '../model/User';
import Section from '../components/section';
import CheckboxActivity from '../components/filterActivity';
import SearchBar from '../components/searchBar';
import { FaRegEye } from "react-icons/fa";




const UsersList = () => {

    const [users, setUsers] = React.useState([])

    // Filtre Users
    const [filterName, setFilterName] = React.useState("")
    const [filterEmail, setFilterEmail] = React.useState("")
    const [filterActivities, setFilterActivities] = React.useState([])


    const selectActivities = (newActivity) => {
        setFilterActivities(prevActivities => {
          const activitiesArray = Array.isArray(prevActivities) ? prevActivities : 
          (prevActivities || '').split(',').filter(activity => activity.trim() !== '');
          if (activitiesArray.includes(newActivity)) {
            return activitiesArray.filter(activity => activity !== newActivity).join(',');
          } else {
            return [...activitiesArray, newActivity].join(',');                 
          }
        });
      };
    
      const removeActivities = () => { 
        setFilterActivities([])
      } 

     // Affichage de couleur d'arrière-plan en fonction de l'activité
     const getBackgroundColor = (activity ) => {
        if(activity === "PUBLISHER") {
            return 'rgba(255, 165, 0)'
        }
        if(activity === "CREATOR") {
            return 'rgba(60, 179, 113)'
        }
        
        if(activity === "VIEWVER") {
            return 'rgba(180, 180, 180)'
        }
       
    };

    const getUsers = async () => {      
        try {
            
            const params = {
                name: filterName,
                email: filterEmail,
                activities : filterActivities
                
            };

            const response = await axios.get('http://localhost:8080/f_admin/getUsersTest', {params} );
            
            const listUsers = response.data.map(
                    user => new User (user.id, user.pseudo, user.email, user.password, user.dateSign, 
                        user.avatar, user.activity, user.roles, user.decks 
            ) )                

            setUsers(listUsers)
        }   
        catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        getUsers();
          }, [filterName, filterEmail, filterActivities]);

    return (
        <Section> 
            <SearchBar onChange={(event) => (setFilterName(event.target.value))}/>
            <CheckboxActivity onClick={(event) => selectActivities(event.target.value)} filterActivities={filterActivities}
                onPush={removeActivities} text={"Retirer"}/>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Avatar</th>
                        <th scope="col">Pseudo</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Activité</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => ( 
                        <tr key={user.id}>
                            <td className="1stTD"><img src={user.avatar} className='admin-table-image' alt='user-avatar'/></td>
                            <td>{user.pseudo}</td>
                            <td>{user.email}</td>
                            <td style={{ backgroundColor: getBackgroundColor(user.activity) }}>{user.activity}</td>
                            <td><FaRegEye /></td>
                        </tr> 
                    ))}
                </tbody>
            </table> 
        </Section>
    )

}

export default UsersList;