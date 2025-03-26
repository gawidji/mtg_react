import React from 'react';
import { useEffect } from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import Section from '../components/section';
import Title from '../components/title';
import IconButton from '../components/buttonIcon';
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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



 

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
                   console.log(color)


            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getDeckSelected();
        }, [id]);

        const [detailsCard, setDetailsCard] = React.useState(null)
        const [unitCards, setUnitCards] = React.useState([])
        

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
    
                    const uniqueCardsMap = new Map();

                    // Parcours des cartes et ajoute uniquement les cartes avec un ID unique
                    const listUnitCards = response.data.map(card => {
                        // Si la carte n'a pas encore été rencontrée (par son ID), on l'ajoute au Map
                        if (!uniqueCardsMap.has(card.id)) {
                            uniqueCardsMap.set(card.id, true);  // Enregistrer l'ID comme déjà vu
                            return new Card(
                                card.id, 
                                card.name, 
                                card.text, 
                                card.image, 
                                card.manaCost, 
                                card.value, 
                                card.formats,
                                card.colors, 
                                card.type, 
                                card.rarity, 
                                card.edition, 
                                card.decks
                            );
                        }
                        return null;  // Ignorer les cartes dupliquées
                    }).filter(card => card !== null);

                    setUnitCards(listUnitCards)

    
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
        

        // Affichage d'images correspondant aux couleurs de la carte
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

      // Méthode pour afficher si les cartes sont en plusieurs exemplaires
      const numberCard = (id) => {
        const cardWithID = cards.filter(card => card.id === id);
        const number = cardWithID.length
        if(number > 1) {
          console.log(number)
          return "x " + number
        }
        else {
          return null
        }
      }
     

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

            // Génère un like ou un dislike selon l'état de la carte
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
            // Modifie la couleur de l'icone coeur après un like
            const hearthIcon = () => {
                if(!deckLikedId.some(deckId => deckId === (id))) {
                    return (<FaRegHeart size="3em" />)
                }
                else {
                    return (<FaHeart size="3em" color="red"/>)
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
            <img src={deck.image} className="deck-background" alt="Image 1" />
                    <div className="card" style={{width : `50%`}}>
                        <h2 className='deck-name'>{deck.name}</h2>

                        <div className="deck-content">
                            <img className="deck-img" src={deck.image} style={{width : `50%`}} alt="Deck mtg"/>

                            <div className="card-body" >
                                <div className='line'>
                                    <h2 className='card-creator'> Créateur : {deck.deckBuilderName}</h2>
                                </div>
                                <div className='line'>
                                    <h4 className='card-value'> Prix du deck : {deck.value} €</h4> 
                                </div>
                                <div className='line'>
                                    <h4 className='card-manaCost'> Cout en mana moyen : {deck.manaCost}</h4> 
                                </div>
                                <div className='line'>
                                    <h4 className='format'> Format : </h4>
                                    <li className='card-format' style={{ backgroundColor: 'green' }}>{deck.format}</li>
                                </div>   
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
                    </div>   
                <div className='button-navig'> 
                    <IconButton onClick={() => prevDeck()} style={{ width: '100px', height: '100px' }} 
                     icon=<IoIosArrowBack size="3em" /> />
                    <IconButton onClick={() => nextDeck()} style={{ width: '100px', height: '100px' }}
                     icon=<IoIosArrowForward size="3em" /> />
                 </div>
                <div className="likeButton-container">
                    <IconButton onClick={likeDislike} style={{ width: '100px', height: '100px' }} icon={hearthIcon()}/>
                </div>    
                <Title title={"Cartes"}/>
                <div className='card-section'>
              {unitCards.map(card => ( 
                  <div className="card-details" key={card.id}>
                      <img className="card-img" src={card.image} alt="Card-image" onClick={() => chooseCard(card.id)} 
                      onMouseEnter={() => hoveredCard(card.id, card.name, card.type, card.text) } onMouseOut={() => hoveredCard() } />
                      <strong className="card-name"> {card.name} </strong>
                    { numberCard(card.id) !== null &&
                      (<p className='numberCard'>{numberCard(card.id)}</p>) 
                    }



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