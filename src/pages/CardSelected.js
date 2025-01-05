import React from 'react';
import { useEffect } from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import Section from '../components/section';
import axios from "axios";
import "./css/CardSelected.css";
import white from "../assets/white-mtg.png"
import blue from "../assets/blue-mtg.png"
import green from "../assets/green-mtg.png"
import red from "../assets/red-mtg.png"
import black from "../assets/black-mtg.png"
 

const CardSelected = () => {
    const [card, setCard] = React.useState([])
    const [format, setFormat] = React.useState([])
    const [color, setColor] = React.useState([])
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
                   setColor(response.colors)


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

        const getColor = (value ) => {
            if(value === "BLANC") {
                return white
            }
            if(value === "BLEU") {
                return blue
            }
            if(value === "VERT") {
                return green
            }
            if(value === "ROUGE") {
                return red
            }
            if(value === "NOIR") {
                return black
            }
            if(value === "INCOLORE") {
                return null
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
                            <h6 className='color'> Couleurs : </h6> 
                            {color && color.length > 0 && (
                                <div className='mappingColor'>
                                  {color.map((color)  => (
                                <img src={getColor(color)} className="color-img-select" alt={color}/>                                
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