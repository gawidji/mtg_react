import BanniereMTG from "../assets/banniere.jpg"
import React from 'react';
import Section from '../components/section';
import "./css/SignPage.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import validator from 'validator';

const SignPage = function () {

    const [pseudo, setPseudo] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const [existingCount, setExistingCount] = React.useState(true);

    const switchForm = () => {
        setExistingCount(prevState => !prevState);
    }

    const validInput = () => {
        const newErrors = [];

        if (!pseudo.trim()) {
            newErrors.push("Veuillez renseigner un pseudo");
        }


        if (!validator.isEmail(email)) {
            newErrors.push("Veuillez entrer un email valide");
        }

        if (password.length < 12) {
            newErrors.push("Veuillez entrer d'au moins 12 caractères.");
        }
    }


    // Form Connexion
    const logIn = async (e) => {
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


    // Form Inscription
    const signUp = async (e) => {
        e.preventDefault();

        if (!validInput()) {
            return;  // Si des erreurs existent, on arrête l'envoi du formulaire
        }

        const user = {
            pseudo,
            email,
            password  
        }
 
        console.log(user);
        
        try{
            const response = await axios.post('http://localhost:8080/f_all/inscription', user);
            // localStorage.setItem('user', JSON.stringify(response.data))
            setExistingCount(true)

        }catch (e) {
            alert("Erreur 404")
        } 


    const onClickClear  = async (e) => { e.preventDefault();
                            setPseudo("");
                            setEmail("");
                            setPassword("");
                        }

        

    }

    
    return (
    <Section>
    <img src={BanniereMTG} className="d-block w-100" alt="Image 1" />
    {existingCount && (
        <div className="login-container">
        <form className="login-form" onSubmit={logIn}> 
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
            </div>
        </form>
        <button className="nav-sign" onClick={()=>switchForm()}>S'inscrire</button>
        </div>
    )}
    {!existingCount && (
        <div className="login-container">
        <form className="login-form" onSubmit={signUp}> 
            <h2 className="p-sign">Inscription</h2>
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
        <button className="nav-sign" onClick={()=>switchForm()}>Se connecter</button>
        </div>
        )}
    </Section>
    )
}

export default SignPage