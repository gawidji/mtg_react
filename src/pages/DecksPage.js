import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import Deck from '../model/Deck';
import axios from "axios";
import "./CardsPage.css";


const DecksPage = () => {
    const [decks, setdecks] = React.useState( [] )
    
    // const navigate = useNavigate();

        // L'appel asynchrone doit obligatoirement etre fait à l'intérieur de useEffect
        useEffect(() => {
        const getDecks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/f_all/testDecks');
    
                    const listDecks = response.data.map(
                        deck => new Deck (deck.id, deck.name, deck.dateCreation, deck.image, deck.format,
                            deck.colors, deck.manaCost, deck.value, deck.isPublic, deck.deckBuilder,
                            deck.deckBuilderName, deck.cartes, deck.commander
                ) )
                        
                setdecks(listDecks)
            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getDecks();
        }, []);

        return (
            <Section className="section">
                      <div className='card-section'>
                        {decks.map(deck => ( 
                            <div className="deck-details"  key={deck.id}>
                                <img className="deck-img" src={deck.image} alt="Deck image" />
                                <strong className="deck-name"> {deck.name} </strong>
                                <strong className="deck-db"> by {deck.deckBuilderName} </strong>
                            </div>
                       
                        ))}
                        </div>

            

                    
          
            </Section>
        )
}

export default DecksPage;