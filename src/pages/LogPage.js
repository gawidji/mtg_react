import BanniereMTG from "../assets/banniere.jpg"
import React from 'react';
import Section from '../components/section';
import { useNavigate } from 'react-router-dom';
import './css/LogPage.css'
import axios from "axios";


const LogPage = function () {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    // const [error, setError] = React.useState("");

    const navigate = useNavigate(); 

const handleSubmit = async (e) => {
    e.preventDefault();

        try{

            const user = {
                email,
                password
            }
            console.log(user)

            const response = await axios.post('http://localhost:8080/f_all/connexion', user);
            // localStorage.setItem('user', JSON.stringify(response.data))


            const jwt = response.data; 

            localStorage.setItem("authToken", jwt)

            alert("Connexion réussie");
            navigate('/myspace')

        }catch (e) {
            alert("Email ou mot de passe inccorect")
        } 

} 
    
    return (
    <Section>
        <img src={BanniereMTG} className="d-block w-100" alt="Image 1" />
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}> 
            <h2 className="p-log">Connexion</h2>
            <div className="input-group">
                <label >E-mail :</label>
                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="input-group">
                <label>Mot de passe :</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}required/>
            </div>
            <div className="link-group">
                <button type="submit">Se connecter</button>
                <a href="/sign"><p className="p-sign">S'inscrire</p></a>
            </div>

        </form>
        </div>
    </Section> 
    )
}

export default LogPage