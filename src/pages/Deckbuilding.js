import React from 'react';
import { useEffect } from 'react';
import { useLocation ,  useNavigate} from 'react-router-dom';
import "./css/Deckbuilding.css";
import Section from '../components/section';
import AddButton from '../components/addButton';
import SearchBar from '../components/searchBar';
import InputValue from '../components/inputValue';
import InputManaCoast from '../components/inputManaCoast';
import CheckboxColor from '../components/filterColor';
import CheckboxFormat from '../components/filterFormat';
import CheckboxRarity from '../components/filterRarity';
import CheckboxEdition from '../components/filterEdition';
import CheckboxType from '../components/filterType';
import CheckboxLegendary from '../components/filterLegendary';
import Card from '../model/Card';
import axios from "axios";
import white from "../assets/white-mtg.png"
import blue from "../assets/blue-mtg.png"
import green from "../assets/green-mtg.png"
import red from "../assets/red-mtg.png"
import black from "../assets/black-mtg.png"
import white_mana from "../assets/white_mana.png"
import blue_mana from "../assets/blue_mana.png"
import green_mana from "../assets/green_mana.png"
import red_mana from "../assets/red_mana.png"
import black_mana from "../assets/black_mana.png"
import { TiDeleteOutline } from "react-icons/ti";



 const Deckbuilding = () => {

       const location = useLocation();
       const id = location.state?.deckID; 
       const [deck, setDeck] = React.useState([])
       const [deckCards, setDeckCards] = React.useState([])
       const [colors, setColors] = React.useState([])
       const [format, setFormat]= React.useState([])
        
        // Renvoie les attributs du deck sélectionné 
        useEffect(() => {
            const getDeckSelected = async () => {
                try {
                    const request = await axios.get(`http://localhost:8080/f_all/getDeckID?deckID=${id}`);
    
                    const response = request.data
        
                        setDeck(response)
                        setFormat(response.format)
                        setColors(response.colors)
  
    
                }   
                catch (error) {
                    console.log(error);
                }
    
        
            }
            getDeckSelected();
            }, [id]);


    // Renvoie les cartes du deck sélectionné
    useEffect(() => {
        const getCardsDeck = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/f_all/getCardDeckID?deckID=${id}`);

                const listCards = response.data.map(
                    card => new Card (card.id, card.name, card.text, card.image, card.manaCost, card.value, card.formats,
                                    card.colors, card.type, card.rarity, card.edition, card.decks
            ) ) 
            setDeckCards(listCards)

            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getCardsDeck();
        }, [deckCards]);


    // Affichage d'image correspondant aux couleurs de la carte
            const getColors = (value ) => {
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

        const getImgColor = (value ) => {
                    if(value === "BLANC") {
                        return white_mana
                    }
                    if(value === "BLEU") {
                        return blue_mana
                    }
                    if(value === "VERT") {
                        return green_mana
                    }
                    if(value === "ROUGE") {
                        return red_mana
                    }
                    if(value === "NOIR") {
                        return black_mana
                    }
                    if(value === "INCOLORE") {
                        return null
                    }
                   
                };

       
        // Ajouter une carte

        const addCard = async (value) => {
            try { 

                
                const response = await axios.post(`http://localhost:8080/f_user/addCardOnDeck?cardId=${value}&deckId=${id}` );
                
                 }   
            catch (error) {
                console.log(error);
            }
        }

        // Ajouter un terrain
        const landColor = (value ) => {
            if(value === "BLANC") {
                return "9"
            }
            if(value === "BLEU") {
                return "12"
            }
            if(value === "VERT") {
                return "14"
            }
            if(value === "ROUGE") {
                return "15"
            }
            if(value === "NOIR") {
                return "16"
            }
            if(value === "INCOLORE") {
                return null
            }
           
        };

        const addLand = (value) => {
            addCard(landColor(value))
        }

        // Retirer une carte du deck
        const deleteCard = async (value) => {
            try {               
                const response = await axios.delete(`http://localhost:8080/f_user/deleteCardOnDeck?cardId=${value}&deckId=${id}` );
                
                 }   
            catch (error) {
                console.log(error);
            }
        }

        // Rechercher une carte dans la datebase

        

        
        return (
            <Section>
                <div className="card-body" >
                            <h2 className="card-name"> {deck.name}</h2>                
                            <h6 className='card-value'> Prix du deck : {deck.value} €</h6> 
                            <h6 className='card-value'> Cout en mana moyen : {deck.manaCost}</h6> 
                            <h6 className='format'> Format : </h6> 
                            <li className='card-format' style={{ backgroundColor: 'green' }}>{deck.format}</li>                            
                            <h6 className='color'> Couleurs : </h6> 
                            {colors && colors.length > 0 && (
                                <div className='mappingColor'>
                                  {colors.map((color)  => (
                                <img src={getColors(color)} className="color-img-select" alt={color}/>                                
                             ))}
                             </div>
                            )}
                </div>

                <div className='mapping-mana'>
                        {colors.map((color)  => (
                              <button className="mana-btn" onClick={() => addLand(color)}>
                              <img src={getImgColor(color)} className="mana-img-select" alt={color}/></button>                             
                           ))}
                </div>
                <button>Ajouter des cartes</button>
                 <div className='deck-container'>
                        {deckCards && deckCards.length > 0 && (
                            <div className='mappingDeckCard'>
                                  {deckCards.map((deckCard)  => (
                                <div className='deck-card'>
                                    <AddButton onClick={() => deleteCard(deckCard.id)} icon={<TiDeleteOutline />}/>
                                    <p className='deck-card-name' key={deckCard.id}>{deckCard.name}</p>  
                                </div>                           
                             ))}
                         </div>
                         )}    
                </div>                
            </Section>
        )

 }

 export default Deckbuilding;