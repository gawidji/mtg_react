import BackgroundMTG from "../assets/background_zombie.jpg"
import BanniereMTG from "../assets/banniere.jpg"
import React from 'react';
import Section from '../components/section';
import "./css/SignPage.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import validator from 'validator';
import ButtonValid from '../components/buttonValid';


const SignPage = function () { 

    const [pseudo, setPseudo] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const [existingCount, setExistingCount] = React.useState(true);

    // Passer du form de connexion au form d'inscription
    const switchForm = () => {
        setExistingCount(prevState => !prevState);
    }

    // Génère une erreur si les directives ne sont pas respectées
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
    <div className="div-container">
    <img src={BackgroundMTG} className="d-block w-100" alt="Image 1" />
    {existingCount && (
        <div className="login-container" style={{width : `40%`}}>
        <h2 className="title-log">Connexion</h2>
        <form className="login-form" onSubmit={logIn} style={{width : `100%`}}> 
            
            <div className="input-group">
                <label >E-mail :</label>
                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="input-group">
                <label>Mot de passe :</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}required/>
            </div>
            <div className="link-group">
                <button className="valid-form" type="submit">Se connecter</button>
                <button className="nav-sign" onClick={()=>switchForm()}>S'inscrire</button>
            </div>
        </form>
        
        </div>
    )}
    {!existingCount && (
        <div className="login-container" >
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
                <button type="submit">Inscription</button>
            </div>
        </form>
        <button className="nav-sign" onClick={()=>switchForm()}>Connexion</button>
        </div>
        )}
    </div>
    )
}

export default SignPage