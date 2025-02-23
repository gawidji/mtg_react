import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import Deck from '../model/Deck';
import SearchBar from '../components/searchBar';
import InputValue from '../components/inputValue';
import InputManaCoast from '../components/inputManaCoast';
import CheckboxColor from '../components/filterColor';
import CheckboxFormat from '../components/filterFormat';
import axios from "axios";
import "./css/DatasPage.css";


const DecksPage = () => {
    const [decks, setdecks] = React.useState( [] )
    const [detailsDeck, setDetailsDeck] = React.useState(null)
    const navigate = useNavigate();
    

    // Filtre recherche
        const [filterName, setFilterName] = React.useState("")
        const [inputValueMin, setInputValueMin] = React.useState("")
        const [inputValueMax, setInputValueMax] = React.useState("")
        const [inputManaCostMin, setInputManaCostMin] = React.useState("")
        const [inputManaCostMax, setInputManaCostMax] = React.useState("")
        const [filterColors, setFilterColors] = React.useState([])
        const [filterFormats, setFilterFormats] = React.useState([])
    
    // const navigate = useNavigate();

        // L'appel asynchrone doit obligatoirement etre fait à l'intérieur de useEffect
        useEffect(() => {
        const getDecks = async () => {
            try {

                // Contient les RequestParams de la requete
                const params = {
                    name: filterName,
                    colors: filterColors,
                    formats: filterFormats,
                    valueMin : inputValueMin,
                    valueMax : inputValueMax,
                    manaCostMin : inputManaCostMin,
                    manaCostMax : inputManaCostMax

                };

                const response = await axios.get('http://localhost:8080/f_all/getDecks', {params});
    
                    const listDecks = response.data.map(
                        deck => new Deck (deck.id, deck.name, deck.dateCreation, deck.image, deck.format,
                            deck.colors, deck.manaCost, deck.value, deck.isPublic, deck.deckBuilder,
                            deck.deckBuilderName, deck.likeNumber, deck.cards, deck.commander
                ) )
                        
                setdecks(listDecks)
            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getDecks();
        }, [filterName, inputValueMin, inputValueMax, inputManaCostMin, inputManaCostMax,
            filterColors, filterFormats]);

         const chooseDeck = (id) => {
          navigate(`/decks/${id}`)
               };
        
        const hoveredDeck = (id, name, format) => {
            setDetailsDeck({ id, name, format });
        }


         // Filtre colors
         const selectColors = (newColor) => {
            setFilterColors(prevColors => {
              const colorsArray = Array.isArray(prevColors) ? prevColors : (prevColors || '').split(',').filter(color => color.trim() !== '');
              if (colorsArray.includes(newColor)) {
                return colorsArray.filter(color => color !== newColor).join(',');
              } else {
                return [...colorsArray, newColor].join(',');                 
              }
            });
          };
        
          const removeColors = () => {
            setFilterColors([])
          }   
          
          // Filtre formats
          const selectFormats = (newFormat) => {
            setFilterFormats(prevFormats => {
              const formatsArray = Array.isArray(prevFormats) ? prevFormats : (prevFormats || '').split(',').filter(format => format.trim() !== '');
              if (formatsArray.includes(newFormat)) {
                return formatsArray.filter(format => format !== newFormat).join(',');
              } else {
                return [...formatsArray, newFormat].join(',');                 
              }
            });
          };
          const removeFormats = () => {
            setFilterFormats([])
          } 

        return (
            <Section className="section">

            <SearchBar  onChange={(event) => (setFilterName(event.target.value))}/>

            <p className="titleValue">Valeur (€)</p>
            <InputValue onChange={(event) => (setInputValueMin(event.target.value))} placeholder={"min"}/>
            <InputValue onChange={(event) => (setInputValueMax(event.target.value))} placeholder={"max"}/>
            <p className="titleManaCost">Cout en mana</p>
            <InputManaCoast onChange={(event) => (setInputManaCostMin(event.target.value))} placeholder={"min"}/>
            <InputManaCoast onChange={(event) => (setInputManaCostMax(event.target.value))} placeholder={"max"}/>
            
            
            <div className="filters">
            <CheckboxColor onClick={(event) => selectColors(event.target.value)} filterColors={filterColors}
              onPush={removeColors} text={"Remove colors filter"}/>
            <CheckboxFormat onClick={(event) => selectFormats(event.target.value)} filterFormats={filterFormats}
              onPush={removeFormats} text={"Remove formats filter"}/>
            </div>
                      <div className='card-section'>
                        {decks.map(deck => ( 
                            <div className="deck-details"  key={deck.id}>
                                <img className="deck-pp" src={deck.image} alt="Deck avatar" onClick={() => chooseDeck(deck.id)}
                                onMouseEnter={() => hoveredDeck(deck.id, deck.name, deck.format) } onMouseOut={() => hoveredDeck()} />
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
                            </div>
                       
                        ))}
                        </div>

            

                    
          
            </Section>
        )
}

export default DecksPage;