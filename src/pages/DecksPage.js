import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import Deck from '../model/Deck';
import Title from '../components/title';
import SearchBar from '../components/searchBar';
import InputValue from '../components/inputValue';
import InputManaCoast from '../components/inputManaCoast';
import CheckboxColor from '../components/filterColor';
import CheckboxFormat from '../components/filterFormat';
import OpenButton from '../components/openButton';
import ButtonSelect from '../components/buttonSelect';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import BackgroundImg  from '../assets/background-deck.jpg'
import axios from "axios";
import "./css/DecksPage.css";



const DecksPage = () => {
    const [decks, setDecks] = React.useState([])
    const [topDecks, setTopDecks] = React.useState([])
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
                        
                setDecks(listDecks)
            }   
            catch (error) {
                console.log(error);
            }

    
        }
        getDecks();
        }, [filterName, inputValueMin, inputValueMax, inputManaCostMin, inputManaCostMax,
            filterColors, filterFormats]);


        useEffect(() => {
          const getTopDecks = async () => {
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
      
                      const response = await axios.get('http://localhost:8080/f_all/getTopDecks', {params});
          
                          const listDecks = response.data.map(
                              deck => new Deck (deck.id, deck.name, deck.dateCreation, deck.image, deck.format,
                                  deck.colors, deck.manaCost, deck.value, deck.isPublic, deck.deckBuilder,
                                  deck.deckBuilderName, deck.likeNumber, deck.cards, deck.commander
                      ) )
                              
                      setTopDecks(listDecks)
                  }   
                  catch (error) {
                      console.log(error);
                  }
      
          
              }
              getTopDecks();
              }, [filterName, inputValueMin, inputValueMax, inputManaCostMin, inputManaCostMax,
                  filterColors, filterFormats]);
        
        const [displayDecks, setDisplayDecks] = React.useState("date")

        const displayTopDecks = () => {
          setDisplayDecks("popularity")
        }

        const displayDateDecks = () => {
          setDisplayDecks("date")
        }


          const getBgDate= () => {
            if(displayDecks==="date") {
              return '#5D3B8C'
            } 
            else {
              return '#D3D3D3'
            }
           }

           const getBgTop= () => {
            if(displayDecks==="popularity") {
              return '#5D3B8C'
            }
            else {
              return '#D3D3D3'
            }
           }

           const getColorDate= () => {
            if(displayDecks==="date") {
              return 'white'
            } 
            else {
              return 'black'
            }
           }

           const getColorTop= () => {
            if(displayDecks==="popularity") {
              return 'white'
            }
            else {
              return 'black'
            }
           }
  




         const chooseDeck = (id) => {
          navigate(`/decks/${id}`)
               };
        
        const hoveredDeck = (id, name, format) => {
            setDetailsDeck({ id, name, format }); 
        }
          // Filtre valeur

         const [arrowValueSens, setArrowValueSens] = React.useState(<SlArrowDown/>)
         const [displayFilterValue, setDisplayFilterValue] = React.useState(false)

         const OpenFilterValue = () => {
          setArrowValueSens((prevIcon) => (prevIcon.type === SlArrowDown ? <SlArrowUp/> : <SlArrowDown/>));    
          setDisplayFilterValue(!displayFilterValue)
         }

         // Filtre cout en mana

         const [arrowManaCostSens, setArrowManaCostSens] = React.useState(<SlArrowDown/>)
         const [displayFilterManaCost, setDisplayFilterManaCost] = React.useState(false)

         const OpenFilterManaCost = () => {
          setArrowManaCostSens((prevIcon) => (prevIcon.type === SlArrowDown ? <SlArrowUp/> : <SlArrowDown/>));    
          setDisplayFilterManaCost(!displayFilterManaCost)
         }

         // Filtre colors

         const [arrowColorSens, setArrowColorSens] = React.useState(<SlArrowDown/>)
         const [displayFilterColors, setDisplayFilterColors] = React.useState(false)

         const OpenFilterColor = () => {
            setArrowColorSens((prevIcon) => (prevIcon.type === SlArrowDown ? <SlArrowUp/> : <SlArrowDown/>));    
            setDisplayFilterColors(!displayFilterColors)                     
                         }

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

        const [arrowFormatSens, setArrowFormatSens] = React.useState(<SlArrowDown/>)
         const [displayFilterFormats, setDisplayFilterFormats] = React.useState(false)

         const OpenFilterFormat = () => {
            setArrowFormatSens((prevIcon) => (prevIcon.type === SlArrowDown ? <SlArrowUp/> : <SlArrowDown/>));    
            setDisplayFilterFormats(!displayFilterFormats)                     
                         }

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
            
            <SearchBar  onChange={(event) => (setFilterName(event.target.value))} placeholder={"Chercher un deck ou un deckbuilder"}/>
            
            <div className='value-filter'>
                <div className='container-button-value' >
                  <OpenButton text="Filtrer par valeur €" onClick={OpenFilterValue} icon={arrowValueSens}
                    className='button-value'/>
                </div>
                {displayFilterValue && (
                        <div className='input-value-container'>
                          <p className="titleValue">Valeur (€)</p>
                          <InputValue onChange={(event) => (setInputValueMin(event.target.value))} placeholder={"min"}/>
                          <InputValue onChange={(event) => (setInputValueMax(event.target.value))} placeholder={"max"}/>
                        </div>
                )}
            </div>

            <div className='manaCost-filter'>
                <div className='container-button-manaCost' >
                  <OpenButton text="Filtrer par cout de mana" onClick={OpenFilterManaCost} icon={arrowManaCostSens}
                    className='button-manaCost'/>
                </div>
                {displayFilterManaCost && (
                  <div className='input-manaCost-container'>
                    <p className="titleManaCost">Cout en mana</p>
                    <InputManaCoast onChange={(event) => (setInputManaCostMin(event.target.value))} placeholder={"min"}/>
                    <InputManaCoast onChange={(event) => (setInputManaCostMax(event.target.value))} placeholder={"max"}/>
                  </div> 
                )}
            </div>
            
            <div className='colors-filter'>
                <div className='container-button-colors' >
                  <OpenButton text="Filtrer par couleurs" onClick={OpenFilterColor} icon={arrowColorSens}
                    className='button-colors'/>
                </div>
                {displayFilterColors && (
                      <div className='checkbox-color-container'>
                        <CheckboxColor onClick={(event) => selectColors(event.target.value)} filterColors={filterColors}
                          onPush={removeColors} text={"Supprimer"}/>
                      </div>
                    )}
            </div>


            <div className='open-buttons'>             
              <OpenButton text="Filtrer par formats" onClick={OpenFilterFormat} icon={arrowFormatSens} width="20%"/>
            </div> 

            <div className='filters'>

                  
                    {displayFilterFormats && (
                    <div className='checkbox-format-container'>
                      <CheckboxFormat onClick={(event) => selectFormats(event.target.value)} filterFormats={filterFormats}
                        onPush={removeFormats} text={"Supprimer"}/>
                    </div>
                    )}
            </div>
            <div className='deck-title'>
              <Title title={"DeckList"}/>
            </div>

            <ButtonSelect className={"button-date"} onClick={() => displayDateDecks()} text={"Les plus récents"}
                         backgroundColor={getBgDate()} color={getColorDate()}/>
            <ButtonSelect className={"button-top"} onClick={() => displayTopDecks()} text={"Les plus populaires"} 
                         backgroundColor={getBgTop()} color={getColorTop()}/>
            
          {displayDecks === "date" && (  
            <div className='deck-section'>
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
          )}

          {displayDecks === "popularity" && (  
            <div className='deck-section'>
                        {topDecks.map(deck => ( 
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
          )}                    
          
            </Section>
        )
}

export default DecksPage;