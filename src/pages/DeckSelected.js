import React from 'react';
import { useEffect } from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import Section from '../components/section';
import LikeButton from '../components/likeButton';
import axios from "axios";
import "./css/DeckSelected.css";
import "./css/CardSelected.css";
import white from "../assets/white-mtg.png"
import blue from "../assets/blue-mtg.png"
import green from "../assets/green-mtg.png"
import red from "../assets/red-mtg.png"
import black from "../assets/black-mtg.png"
import Card from '../model/Card';
import Deck from '../model/Deck';
import { FaHeart, FaRegHeart  } from 'react-icons/fa';


 

const DeckSelected = () => {
    const [deck, setDeck] = React.useState([])
    const [color, setColor] = React.useState([])
    const [cards, setCards] = React.useState([])
    const navigate = useNavigate();

    
    const { id } = useParams();
        // { id } va récupérer uniquement la valeur située à l'emplacement :number dans le rout
    
        // Renvoie les attributs du deck sélectionné
        useEffect(() => {
        const getDeckSelected = async () => {
            try {
                const request = await axios.get(`http://localhost:8080/f_all/getDeckID?deckID=${id}`);

                const response = request.data
    
                    setDeck(response)
                   
                   setColor(response.colors)


            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getDeckSelected();
        }, [id]);

        const [detailsCard, setDetailsCard] = React.useState(null)
        

        // Renvoie les cartes du deck sélectionné
        useEffect(() => {
            const getCardsDeck = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/f_all/getCardDeckID?deckID=${id}`);
    
                    const listCards = response.data.map(
                        card => new Card (card.id, card.name, card.text, card.image, card.manaCost, card.value, card.formats,
                                        card.colors, card.type, card.rarity, card.edition, card.decks
                ) ) 
                    setCards(listCards)
    
                }   
                catch (error) {
                    console.log(error);
                }
    
        
            }
            getCardsDeck();
            }, [id]);

        // Boutons navigation decks
        const prevDeck = () => { 
            navigate(`/decks/${parseInt(id) - 1}`)
              };

        const nextDeck = () => {
            navigate(`/decks/${parseInt(id) + 1}`)
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

      
      const [deckLikedId, setDeckLikedId] = React.useState([])
      const token = localStorage.getItem('authToken');

        
      // Renvoie les decks likés par l'user connecté
      useEffect(() => {
      const getDecksLiked = async () => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                };
            
            const response = await axios.get(`http://localhost:8080/f_user/getDeckLiked`, config);
            
            const listDecks = response.data.map(
                    deck => new Deck (deck.id, deck.name, deck.dateCreation, deck.image, deck.format,
                    deck.colors, deck.manaCost, deck.value, deck.isPublic, deck.deckBuilder,
                    deck.deckBuilderName, deck.likeNumber, deck.cards, deck.commander
            ) )                
            
            const listId = listDecks.map(deck => deck.id)
            let listIdConv = listId.map(valeur => `${valeur}`);
            
            setDeckLikedId(listIdConv)
            console.log(deckLikedId)
           
        }
        catch (error) {
            console.log(error);
            }
         }
        getDecksLiked();
           }, []);
     

           // Méthode liker un deck
            const likeDeck = async () => {
                try {

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        };

                   await axios.post(`http://localhost:8080/f_user/likeDeck?deckId=${id}`, config);          
                   setDeckLikedId(prevState => [...prevState, id]); 
                   console.log(deckLikedId)
                }   
                catch (error) {
                    console.log(error);
                }
            };

            // Méthode disliker un deck
            const dislikeDeck = async () => {
                try {

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        };

                   await axios.delete(`http://localhost:8080/f_user/dislikeDeck?deckId=${id}`, config);          
                   setDeckLikedId(prevState => prevState.filter(deckId => deckId !== id));
                   console.log(deckLikedId)
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
                    if (!deckLikedId.some(deckId => deckId === (id))) {
                        likeDeck();
                    }
                    else {
                        dislikeDeck();
                    }
                }
            }

            const hearthIcon = () => {
                if(!deckLikedId.some(deckId => deckId === (id))) {
                    return (<FaRegHeart size="2em" />)
                }
                else {
                    return (<FaHeart size="2em" color="red"/>)
                }
            }

            // Pop-up détails de cartes
            const hoveredCard = (id, name, type, text) => {
                setDetailsCard({ id, name, type, text });
            }

            // Naviguer vers une carte
            const chooseCard = (id) => {
                navigate(`/cards/${id}`)
                  };


        return (
            <Section className="section">

                    <div className="card" style={{width : `50%`}}>
                    <img className="deck-img" src={deck.image} alt="Deck mtg"/>
                        <div className="card-body" >
                            <h2 className="card-name"> {deck.name}</h2>                
                            <h6 className='card-value'> Prix du deck : {deck.value} €</h6> 
                            <h6 className='card-value'> Cout en mana moyen : {deck.manaCost}</h6> 
                            <h6 className='format'> Format : </h6> 
                            <li className='card-format' style={{ backgroundColor: 'green' }}>{deck.format}</li>                            
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
                    <button onClick={() => prevDeck()} > Deck précédent</button>
                    <button onClick={() => nextDeck()}> Deck suivant</button>
                 </div>
                <div className="likeButton-container">
                    <LikeButton className= "likeButton" onClick={likeDislike} icon={hearthIcon()}/>
                </div>    

                <div className='card-section'>
            <h3>Cartes : </h3>
            <br/>
              {cards.map(card => ( 
                  <div className="card-details" key={card.id}>
                      <img className="card-img" src={card.image} alt="Card-image" onClick={() => chooseCard(card.id)} 
                      onMouseEnter={() => hoveredCard(card.id, card.name, card.type, card.text) } onMouseOut={() => hoveredCard() } />
                      <strong className="card-name"> {card.name} </strong>


                  {detailsCard && detailsCard.id === card.id && (
                  <div className="container-mt-5" >
                      <div className="hv-card" style={{maxWidth: '18rem', border : '2px solid black',
                           padding: '5px', borderRadius : '5px', backgroundColor:'rgba(208,215,231,255)'}}>
                          <div className="hv-card-body">
                              <h5 className="hv-title">{detailsCard.name}</h5>
                              <hr/>
                              <h6 className="hv-type">{detailsCard.type}</h6>
                              <hr/>
                              <p className="hv-text" style={{color: 'black'}}>{detailsCard.text}</p>
                          </div>
                      </div>
                  </div>
                  )}
              </div>
              ))}
            </div>                              
                             
            </Section>
        )
}

export default DeckSelected;