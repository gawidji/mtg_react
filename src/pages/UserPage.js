import React from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import User from '../model/User';
import axios from "axios";
import "./css/CardsPage.css";

const UsersPage = () => {
    const [users, setUsers] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true);

    // const navigate = useNavigate();

        // L'appel asynchrone doit obligatoirement etre fait à l'intérieur de useEffect
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/f_all/testUsers');              
                const listUsers = response.data.map(
                        user => new User (user.id, user.pseudo, user.email, user.password, user.dateSign, user.avatar, user.activity,
                            user.roles, user.decks
                ) )                
                              
                setUsers(listUsers)
                setIsLoading(false)

                console.log("users :  " + users.map(user => (user.pseudo)))

            }   
            catch (error) {
                console.log(error);
            }

    
        }
        React.useEffect(() => {
            getUsers();
        }, []);
        
    if(isLoading) {
        return (
            <Section className="section">
                 <strong className="card-name"> Chargement en cours </strong>       
          
            </Section> )
    }             
        return (
            <Section className="section">
                     <div className='card-section'>
                        {users.map(user => ( 
                            <div className="card-details" key={user.id}>
                                <strong className="card-name"> {user.pseudo} </strong>
                                <strong className="card-name"> {user.roles} </strong>
                            </div>
                        
                        ))}
                        </div>                   
            </Section>
        )

}

export default UsersPage;