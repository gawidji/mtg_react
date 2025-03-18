import React from 'react';
import { useEffect } from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import axios from "axios";
import Section from '../components/section';
import OpenButton from '../components/openButton'
import Deck from '../model/Deck';
import Card from '../model/Card';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FaHeart  } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa6";
import "./css/AccountPage.css"





const AccountPage = () => {
    const [deckBuilder, setDeckBuilder] = React.useState([])
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');



        useEffect(() => {
        const getDeckBuilder = async () => {
            try {
                console.log("token : " + token)
                // Configurer l'en-tête Authorization avec le token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    };

                const request = await axios.get(`http://localhost:8080/f_user/myspace`, config);

                const response = request.data
    
                setDeckBuilder(response)
                   

            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getDeckBuilder();
        }, []);

        
            
            const [decks, setDecks] = React.useState( [] )
            const [detailsDeck, setDetailsDeck] = React.useState(null)

                const getDecks = async () => {
                    try {
                        // Configurer l'en-tête Authorization avec le token
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            };
        
                        const request = await axios.get(`http://localhost:8080/f_user/getDecksByUser`, config);
                        
                        const response = request.data.map(
                            deck => new Deck (deck.id, deck.name, deck.dateCreation, deck.image, deck.format,
                                deck.colors, deck.manaCost, deck.value, deck.isPublic, deck.deckBuilder,
                                deck.deckBuilderName, deck.likeNumber, deck.cards, deck.commander
                    ) )
            
                        setDecks(response)
                           
        
                    }   
                    catch (error) {
                        console.log(error);
                    }
        
            
                }

                const [arrowSens, setArrowSens] = React.useState(<SlArrowDown/>)
                const [arrowUp, setArrowUp] = React.useState(false)

                const DisplayDecks = () => {
                    setArrowSens((prevIcon) => (prevIcon.type === SlArrowDown ? <SlArrowUp/> : <SlArrowDown/>));
                    setArrowUp((prevArrowSens) => !prevArrowSens); 
                    if (decks.length === 0) {
                        getDecks(); 
                    } else {
                        setDecks([]);
                    }
                
                }

                

                const hoveredDeck = (id, name, format) => {
                    setDetailsDeck({ id, name, format });
                }

                const newDeck = () => {
                    navigate(`/newDeck`)
                         };
             
                // Afficher les cartes likées

                    const [cardsLiked, setCardsLiked] = React.useState( [] )
                    const [detailsCardLiked, setDetailsCardLiked] = React.useState(null)


                    const getCardsLiked = async () => {
                        try {
                            // Configurer l'en-tête Authorization avec le token
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                };
            
                            const request = await axios.get(`http://localhost:8080/f_user/GetCardLiked`, config);
                            
                            const response = request.data.map(
                                card => new Card (card.id, card.name, card.text, card.image, card.manaCost, card.value, card.formats,
                                                card.colors, card.type, card.rarity, card.edition, card.decks 
                        ) ) 
                
                        setCardsLiked(response)
                               
            
                        }   
                        catch (error) {
                            console.log(error);
                        }              
                    }
                    
                    const [arrowSens2, setArrowSens2] = React.useState(<SlArrowDown/>)
                    const [arrowUp2, setArrowUp2] = React.useState(false)
            
                    const DisplayCardsLiked = () => {
                        setArrowSens2((prevIcon) => (prevIcon.type === SlArrowDown ? <SlArrowUp/> : <SlArrowDown/>));
                        setArrowUp2((prevArrowSens2) => !prevArrowSens2); 
                        if (decksLiked.length === 0) {
                            getCardsLiked(); 
                        } else {
                            setCardsLiked([]);
                        }
                    
                    }

                    const chooseCard = (id) => {
                        navigate(`/cards/${id}`)
                             };
            
                    const hoveredCardLiked = (id, name, type, text) => {
                        setDetailsCardLiked({ id, name, type, text });
                    }

        // Afficher les decks likés

        const [decksLiked, setDecksLiked] = React.useState( [] )
        const [detailsDeckLiked, setDetailsDeckLiked] = React.useState(null)
        
        const getDecksLiked = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    };

                const request = await axios.get(`http://localhost:8080/f_user/getDeckLiked`, config);
                
                const response = request.data.map(
                    deck => new Deck (deck.id, deck.name, deck.dateCreation, deck.image, deck.format,
                        deck.colors, deck.manaCost, deck.value, deck.isPublic, deck.deckBuilder,
                        deck.deckBuilderName, deck.likeNumber, deck.cards, deck.commander
            ) )
    
            setDecksLiked(response)
                   

            }   
            catch (error) {
                console.log(error);
            }
        }

        const [arrowSens3, setArrowSens3] = React.useState(<SlArrowDown/>)
        const [arrowUp3, setArrowUp3] = React.useState(false)

        const DisplayDecksLiked = () => {
            setArrowSens3((prevIcon) => (prevIcon.type === SlArrowDown ? <SlArrowUp/> : <SlArrowDown/>));
            setArrowUp3((prevArrowSens3) => !prevArrowSens3); 
            if (decksLiked.length === 0) {
                getDecksLiked(); 
            } else {
                setDecksLiked([]);
            }
        
        }


        const chooseDeck = (id) => {
            navigate(`/decks/${id}`)
                 };

         

        const hoveredDeckLiked = (id, name, format) => {
            setDetailsDeckLiked({ id, name, format });
        }
        

        if(token == null) {
            return (
                <Section className="section">
                <p> Veuillez vous reconnecter</p>
                </Section>
            )

        }

        return (
            <Section className="section">

                        <div className="card-body text-center">
                            <div className="mt-3 mb-4">
                            <img src={deckBuilder.avatar} alt="pp-user"
                                className="rounded-circle img-fluid" style={{width: '100px'}} />
                            </div>
                            <h4 className="mb-2">{deckBuilder.pseudo}</h4>
                            <p className="text-muted mb-4">{deckBuilder.email}</p>
                            
                            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-rounded btn-lg">
                            Editer profil
                            </button>
                        </div>
                <div className="openButtons-container">
                < OpenButton text="Mes decks" onClick={DisplayDecks} icon={arrowSens} width="100%"/>
                    {arrowUp === true && 
                    <div className='card-section'>
                    {decks.map(deck => ( 
                        <div className="deck-details"  key={deck.id}>
                            <img className="deck-pp" src={deck.image} alt="Deck avatar"
                            onMouseEnter={() => hoveredDeck(deck.id, deck.name, deck.format) } onMouseOut={() => hoveredDeck()}/>
                            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                                <FaHeart color="red"/>
                            </div>
                            <strong className="deck-name"> {deck.name} </strong>
                            <strong className="deck-db"> by {deck.deckBuilderName} </strong>

                            {detailsDeck && detailsDeck.id === deck.id && (
                                    <div className="container-mt-5" >
                                        <div className="hv-card" style={{maxWidth: '18rem', border : '2px solid black',
                                            padding: '5px', borderRadius : '5px', backgroundColor:'rgba(208,215,231,255)'}}>
                                            <div className="hv-card-body">
                                                <h5 className="hv-title">{detailsDeck.name}</h5>
                                                <hr/>
                                                <h6 className="hv-type">{detailsDeck.format}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                            <button className="new-deck" onClick={() => newDeck()}><FaPlus /></button>
                        </div>
                
                    ))}
                    
                    </div>
                    }


                < OpenButton text="Mes cartes likées" onClick={DisplayCardsLiked} icon={arrowSens2} width="100%"/>
                        {arrowUp2 === true &&
                        <div className='card-section'>

                        {cardsLiked.map(card => ( 
                            <div className="card-details" key={card.id}>
                                <img className="card-img" src={card.image} alt="Card-image" onClick={() => chooseCard(card.id)}
                                onMouseEnter={() => hoveredCardLiked(card.id, card.name, card.type, card.text) } onMouseOut={() => hoveredCardLiked() } />
                                <strong className="card-name"> {card.name} </strong>
        
        
                            {detailsCardLiked && detailsCardLiked.id === card.id && (
                            <div className="container-mt-5" >
                                <div className="hv-card" style={{maxWidth: '18rem', border : '2px solid black',
                                    padding: '5px', borderRadius : '5px', backgroundColor:'rgba(208,215,231,255)'}}>
                                    <div className="hv-card-body">
                                        <h5 className="hv-title">{detailsCardLiked.name}</h5>
                                        <hr/>
                                        <h6 className="hv-type">{detailsCardLiked.type}</h6>
                                        <hr/>
                                        <p className="hv-text" style={{color: 'black'}}>{detailsCardLiked.text}</p>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                        ))}
                </div> 
                }

            < OpenButton text="Mes decks likés" onClick={DisplayDecksLiked} icon={arrowSens3} width="100%"/>
                
                {arrowUp3 === true && 
                <div className='card-section'>
                {decksLiked.map(deck => ( 
                    <div className="deck-details"  key={deck.id}>
                        <img className="deck-pp" src={deck.image} alt="Deck avatar" onClick={() => chooseDeck(deck.id)}
                        onMouseEnter={() => hoveredDeckLiked(deck.id, deck.name, deck.format) } onMouseOut={() => hoveredDeckLiked()}/>
                        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                            <FaHeart color="red"/>
                         </div>
                        <strong className="deck-name"> {deck.name} </strong>
                        <strong className="deck-db"> by {deck.deckBuilderName} </strong>

                        {detailsDeckLiked && detailsDeckLiked.id === deck.id && (
                                <div className="container-mt-5" >
                                    <div className="hv-card" style={{maxWidth: '18rem', border : '2px solid black',
                                        padding: '5px', borderRadius : '5px', backgroundColor:'rgba(208,215,231,255)'}}>
                                        <div className="hv-card-body">
                                            <h5 className="hv-title">{detailsDeckLiked.name}</h5>
                                            <hr/>
                                            <h6 className="hv-type">{detailsDeckLiked.format}</h6>
                                        </div>
                                    </div>
                                </div>
                                )}
                    </div>
               
                ))}
                
                </div>
                }
                </div>

            </Section>




        )

    }

    export default AccountPage;