import React from 'react';
import { useEffect } from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import Section from '../components/section';
import axios from "axios";
import "./CardSelected.css";
 

const CardSelected = () => {
    const [card, setCard] = React.useState([])
    const [format, setFormat] = React.useState([])
    const navigate = useNavigate();

    
    const { id } = useParams();
        // { id } va récupérer uniquement la valeur située à l'emplacement :number dans le rout
    
        // L'appel asynchrone doit obligatoirement etre fait à l'intérieur de useEffect
        useEffect(() => {
        const getCardSelected = async () => {
            try {
                const request = await axios.get(`http://localhost:8080/f_all/getCard?cardId=${id}`);

                const response = request.data
    
                    setCard(response)
                   
                   setFormat(response.formats)
                   console.log(format)


            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getCardSelected();
        }, [id]);

        const prevCard = () => { 
            navigate(`/cards/${parseInt(id) - 1}`)
              };

        const nextCard = () => {
            navigate(`/cards/${parseInt(id) + 1}`)
              };
        
        
        const getBackgroundColor = (rarity ) => {
            if(rarity == "MYTHIQUE") {
                return 'rgba(206,67,35,255)'
            }
            if(rarity == "RARE") {
                return 'rgba(159,134,53,255)'
            }
            if(rarity == "UNCOMMUNE") {
                return 'rgba(167,182,202,255)'
            }
            if(rarity == "COMMUNE") {
                return 'rgba(159,134,53,255)'
            }
           
        };


        return (
            <Section className="section">

                    <div className="card" style={{width : `50%`}}>
                    <img className="card-img" src={card.image} alt="Card image"/>
                        <div className="card-body" >
                            <h2 className="card-name"> {card.name}</h2>
                            <h6 className='text'> Texte : </h6> 
                            <p className='card-text'> {card.text}</p>                  
                            <h6 className='card-value'> Prix moyen : {card.value} €</h6> 
                            <div className='rarity-line'>
                            <h6 className='rarity'> Rareté : </h6>
                            <h6 className='card-rarity' style={{ backgroundColor: getBackgroundColor(card.rarity) }}>{card.rarity} </h6>
                            </div> 
                            <h6 className='format'> Formats autorisés : </h6> 
                            {format && format.length > 0 && (
                                <div className='mappingFormat'>
                                  {format.map((formatAut)  => (
                                    <li className='card-format' style={{ backgroundColor: 'green' }}>{formatAut}</li>
                                ))}
                                </div>
                            )}
         
                        </div>
                    </div>  
                <div className='button-navig'>
                    <button onClick={() => prevCard()} > Carte précédente</button>
                    <button onClick={() => nextCard()}> Carte suivante</button>
                 </div>
                                                   
                             
            </Section>
        )
}

export default CardSelected;