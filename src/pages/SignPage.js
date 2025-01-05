import BanniereMTG from "../assets/banniere.jpg"
import React from 'react';
import Section from '../components/section';
import "./css/SignPage.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const SignPage = function () {

    const [pseudo, setPseudo] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");



    const onClickClear  = async (e) => { e.preventDefault(); console.log({pseudo, email, password});
    setPseudo("");
    setEmail("");
    setPassword("");}
    // se déclenche à l'envoie du form pour reset les champs en évitant un rechargement de la page

    const navigate = useNavigate();
    // Permet d'appeler la méthode navigate pour e diriger vers une autre page

    const handleSubmit = async (e) => {
        e.preventDefault();

        // cette const contient un objet avec les memes valeurs que l'api, elle communique ainsi directement avec l'API
        const user = {
            pseudo,
            email,
            password
        }

        console.log(user);
        
        //On import l'url entré dans le fichier api 

        try{
            const response = await axios.post('http://localhost:8080/f_all/inscription', user);
            localStorage.setItem('user', JSON.stringify(response.data))
            alert("Enregistrement reussi");
            navigate('/log')

            console.log(response)
        }catch (e) {
            alert("Erreur 404")
        } // L'alert affiche les données et un message reçu du serveur par la requete response

        

    }

    
    return (
    <Section>
        <img src={BanniereMTG} className="d-block w-100" alt="Image 1" />
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}> 
            <h2>Inscription</h2>
            <div className="input-group">
                <label>Pseudo :</label>
                <input type="pseudo" id="pseudo" name="pseudo" onChange={(e) => setPseudo(e.target.value)} required/>
            </div>
            <div className="input-group">
                <label >E-mail :</label>
                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}required/>
            </div>
            <div className="input-group">
                <label>Mot de passe :</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="button-group">
                <button type="submit">S'inscrire</button>
            </div>
        </form>
        </div>
    </Section>
    )
}

export default SignPage