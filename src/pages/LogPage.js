import BanniereMTG from "../assets/banniere.jpg"
import React from 'react';
import Section from '../components/section';
import './css/LogPage.css'


const LogPage = function () {

    const [email, setEmail] = React.useState("");
    const [mdp, setMdp] = React.useState("");
    // setEmail, setMdp se déclenchent à chaque fois qu'un caractère est entré dans le champ dans lequel ils sont appelés
    // les valeurs qu'ils récupèrent sont ensuite intégrées dans email et mdp


    const SendForm  = async (e) => { e.preventDefault(); console.log({email, mdp});
    setEmail("");
    setMdp("");}
    // se déclenche à l'envoie du form pour éviter un rechargement de la page

    
    return (
    <Section>
        <img src={BanniereMTG} className="d-block w-100" alt="Image 1" />
        <div className="login-container">
        <form className="login-form" onSubmit={SendForm}> 
            <h2>Connexion</h2>
            <div className="input-group">
                <label >E-mail :</label>
                <input type="email" id="email" name="email" onChange={setEmail} required/>
            </div>
            <div className="input-group">
                <label>Mot de passe :</label>
                <input type="password" id="password" name="password" onChange={setMdp} required/>
            </div>
            <div className="button-group">
                <button type="submit">Se connecter</button>
            </div>
        </form>
        </div>
    </Section>
    )
}

export default LogPage