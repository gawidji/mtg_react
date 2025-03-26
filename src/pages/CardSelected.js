import React from 'react';
import { useEffect } from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import Section from '../components/section';
import IconButton from '../components/buttonIcon';
import axios from "axios";
import "./css/CardSelected.css";
import white from "../assets/white-mtg.png"
import blue from "../assets/blue-mtg.png"
import green from "../assets/green-mtg.png"
import red from "../assets/red-mtg.png"
import black from "../assets/black-mtg.png"
import Card from '../model/Card';
import { FaHeart, FaRegHeart  } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

 
   

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
                
                const request = await axios.get(`http://localhost:8080/f_all/getCardID?cardID=${id}`);

                const response = request.data
    
                    setCard(response)
                   
                   setFormat(response.formats)
                   setColor(response.colors)

                   console.log("token : " + token)


            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getCardSelected();
        }, [id]);

        // Boutons navigation cartes
        const prevCard = () => { 
            navigate(`/cards/${parseInt(id) - 1}`)
              };

        const nextCard = () => {
            navigate(`/cards/${parseInt(id) + 1}`)
              };
        
        
        // Affichage de couleur d'arrière-plan en fonction de la rareté
        const getBackgroundColor = (rarity ) => {
            if(rarity === "MYTHIQUE") {
                return 'rgba(206,67,35,255)'
            }
            if(rarity === "RARE") {
                return 'rgba(159,134,53,255)'
            }
            if(rarity === "UNCO") {
                return 'rgba(167,182,202,255)'
            }
            if(rarity === "COMMUNE") {
                return 'rgba(0,0,0,255)'
            }
           
        };  

        // Affichage d'image correspondant aux couleurs de la carte
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

      const [cardLikedId, setCardLikedId] = React.useState([])
      const token = localStorage.getItem('authToken');

        
      // Renvoie les cartes likés par l'user connecté
      useEffect(() => {
      const getCardsLiked = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                };
            
            const response = await axios.get(`http://localhost:8080/f_user/GetCardLiked`, config);
            
            const listCards = response.data.map(
                    card => new Card (card.id, card.name, card.text, card.image, card.manaCost, card.value, card.formats,
                                    card.colors, card.type, card.rarity, card.edition, card.decks
            ) )                
            
            const listId = listCards.map(card => card.id)
            let listIdConv = listId.map(valeur => `${valeur}`);
            
            setCardLikedId(listIdConv)
            console.log(cardLikedId)
           
        }
        catch (error) {
            console.log(error);
            }
         }
        getCardsLiked();
           }, []);
     

           // Méthode liker une carte
            const likeCard = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        };
                    console.log(`Carte ${id} likée`);

                   await axios.post(`http://localhost:8080/f_user/likeCard?cardId=${id}`, config);          
                   setCardLikedId(prevState => [...prevState, id]);                   
                }   
                catch (error) {
                    console.log(error);
                }
            };

            // Méthode disliker une carte
            const dislikeCard = async () => {
                try {

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        };

                   await axios.delete(`http://localhost:8080/f_user/dislikeCard?cardId=${id}`, config);          
                   setCardLikedId(prevState => prevState.filter(cardId => cardId !== id));
                    }   
                catch (error) {
                    console.log(error);
                }
            };

            const likeDislike = () => {

              if(token === null) {
                navigate(`/log`)
              }
              else {
                if (!cardLikedId.some(cardId => cardId === (id))) {
                    likeCard();
                }
                else {
                    dislikeCard();
                }
              }

            }

            const hearthIcon = () => {
                if(!cardLikedId.some(cardId => cardId === (id))) {
                    return (<FaRegHeart size="3em" />)
                }
                else {
                    return (<FaHeart size="3em" color="red"/>)
                }
            }
 

        return (
            <Section className="section">

                    <div className="card" style={{width : `50%`}}>
                    <img className="card-img" src={card.image} alt="Card mtg"/>
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
                    <IconButton className= "directionButton" onClick={() => prevCard()} style={{ width: '100px', height: '100px' }} 
                     icon=<IoIosArrowBack size="3em" /> />
                    <IconButton className= "directionButton" onClick={() => nextCard()} style={{ width: '100px', height: '100px' }}
                     icon=<IoIosArrowForward size="3em" /> />
                 </div>
                <div className="likeButton-container">
                    <IconButton className= "likeButton" onClick={likeDislike} style={{ width: '100px', height: '100px' }} 
                    icon={hearthIcon()}/>
                </div>                                  
                             
            </Section>
        )
}

export default CardSelected;