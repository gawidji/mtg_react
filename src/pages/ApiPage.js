import Section from "../components/section"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ApiPage.css"
import React, { useEffect, useState } from 'react';
// useEffect et useState sont nécessaires pour les appels asynchrones en React
// useEffect se déclenche quand les données de l'api arrivent
// useState stock les données réupérées
import { useNavigate } from 'react-router-dom';




const ApiPage = function () {

    const [data, setData] = useState(null);
    // La variable data contient la valeur de useState (pour l'instant elle est nulle)
    //  Mais elle peut etre modifié par le biais de la méthode setData 
    // à laquelle on va implémenter la réponse de l'api
    const [number, setNumber] = useState(1);
    // On démarre une variable number à 1
    const navigate = useNavigate();
    // On importe la méthode naviagate de React pour l'utiliser dans les boutons

    let linkAPI = `https://pokeapi.co/api/v2/pokemon/${number}`
    
    function addNumber () { 
    { return setNumber(prevNumber => prevNumber +1) }
     }
     // Incrémente le numéro précédent

    // L'appel asynchrone doit obligatoirement etre fait à l'intérieur de useEffect
    useEffect(() => {
    const fetchData = async () => {
        try {
                // fonction qui effectue la requete vers le lien
                let req = await fetch(linkAPI)

                // fonction qui traduit la requete du json
                let resJS = await req.json();
                // on implémente le résultat de l'api dans setData pour qu'il modifie data
                setData(resJS)
             }
        catch {
                console.log("ERREUR");       
        }

    }
    fetchData();
    }, [number]);
    // L'array vide permet d'assurer que fetchData ne soit appelé qu'une seule fois pour récupérer sa donnée de l'api
    // Ici on veut qu'elle soit appelé à chaque incrémentation de number


    if (data == null) {
        return <Section>Loading...</Section>;
    }
    console.log({number}); 
    console.log(data.back_default)

    const chooseCard = () => {
        if (data.id) {
          navigate(`/api/${data.id}`);
        }
      };


    return (
        <div className="api">
            <img alt="imgAPI" className='imgAPI' src={data.sprites.front_default}/>
            <h5 className='mtgName'>{data.name}</h5>
            <h6 className='mtgID'> #{data.id}</h6>
            <div className="buttonApi">
            <button id="nextCard" onClick={addNumber} >Suivant</button>
            <button id="chooseCard" onClick={chooseCard}> Sélectionner </button>
            </div>
        </div>
    ) 

}

export default ApiPage