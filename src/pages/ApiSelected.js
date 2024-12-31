import Section from "../components/section"; 
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// useParams renvoie un objet contenant les paramètres d'URL


const ApiSelected = function () {
    const [data, setData] = useState(null);
    // La variable data contient la valeur de useState (pour l'instant elle est nulle)
    //  Mais elle peut etre modifié par le biais de la méthode setData 
    // à laquelle on va implémenter la réponse de l'api
    // On démarre une variable number à 1

    const { number } = useParams();
    // { number } va récupérer uniquement la valeur située à l'emplacement :number dans le rout

    let linkAPI = `https://pokeapi.co/api/v2/pokemon/${number}`
    console.log(linkAPI)

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
    }, []);
    // L'array vide permet d'assurer que fetchData ne soit appelé qu'une seule fois pour récupérer sa donnée de l'api


    if (data == null) {
        return <Section>Loading...</Section>;
    }
    console.log(data.back_default)


    return (
        <Section>
            <img alt="imgAPI" className='imgAPI' src={data.sprites.front_default}/>
            <h5 className='mtgName'>{data.name}</h5>
            <h6 className='mtgID'> #{data.id}</h6>      
        </Section>
    ) 

}

export default ApiSelected