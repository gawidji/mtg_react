import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
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
import "./css/DatasPage.css";

const CardsPage = () => {
    const [cards, setCards] = React.useState([])
    const [detailsCard, setDetailsCard] = React.useState(null)
    const navigate = useNavigate();

    // Filtre recherche
    const [filterName, setFilterName] = React.useState("")
    const [inputValueMin, setInputValueMin] = React.useState("")
    const [inputValueMax, setInputValueMax] = React.useState("")
    const [inputManaCostMin, setInputManaCostMin] = React.useState("")
    const [inputManaCostMax, setInputManaCostMax] = React.useState("")
    const [filterColors, setFilterColors] = React.useState([])
    const [filterFormats, setFilterFormats] = React.useState([])
    const [filterRarities, setFilterRarities] = React.useState([])
    const [filterEditions, setFilterEditions] = React.useState([])
    const [filterTypes, setFilterTypes] = React.useState([])
    const [filterLegendary, setFilterLegendary] = React.useState(null)






    
        // L'appel asynchrone doit obligatoirement etre fait à l'intérieur de useEffect
        const getCards = async () => {
            try {

                // Contient les RequestParams de la requete
                const params = {
                    name: filterName,
                    colors: filterColors,
                    formats: filterFormats,
                    rarities : filterRarities,
                    valueMin : inputValueMin,
                    valueMax : inputValueMax,
                    manaCostMin : inputManaCostMin,
                    manaCostMax : inputManaCostMax,
                    editions : filterEditions,
                    types : filterTypes,
                    legendary : filterLegendary
                };
                
                const response = await axios.get('http://localhost:8080/f_all/getCards', {params} );
                
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
        React.useEffect(() => {
          getCards();
      }, [filterName, inputValueMin, inputValueMax, inputManaCostMin, inputManaCostMax,
         filterColors, filterFormats, filterRarities, filterEditions, filterTypes, filterLegendary]);


        const chooseCard = (id) => {
        navigate(`/cards/${id}`)
          };
        
        

        const hoveredCard = (id, name, type, text) => {
         setDetailsCard({ id, name, type, text });

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


          // Filtre raretés
          const selectRarities = (newRarity) => {
            setFilterRarities(prevRarities => {
              const raritiesArray = Array.isArray(prevRarities) ? prevRarities : (prevRarities || '').split(',').filter(rarity => rarity.trim() !== '');
              if (raritiesArray.includes(newRarity)) {
                return raritiesArray.filter(rarity => rarity !== newRarity).join(',');
              } else {
                return [...raritiesArray, newRarity].join(',');                 
              }
            });
          };
          const removeRarities = () => {
            setFilterRarities([])
          } 

        // Filtre editions
        const selectEditions = (newEdition) => {
          setFilterEditions(prevEditions => {
            const editionsArray = Array.isArray(prevEditions) ? prevEditions : (prevEditions || '').split(',').filter(edition => edition.trim() !== '');
            if (editionsArray.includes(newEdition)) {
              return editionsArray.filter(edition => edition !== newEdition).join(',');
            } else {
              return [...editionsArray, newEdition].join(',');                 
            }
          });
        };
        const removeEditions = () => {
          setFilterEditions([])
        } 

         // Filtre types
         const selectTypes = (newType) => {
            setFilterTypes(prevTypes => {
            const typesArray = Array.isArray(prevTypes) ? prevTypes : (prevTypes || '').split(',').filter(type => type.trim() !== '');
            if (typesArray.includes(newType)) {
              return typesArray.filter(type => type !== newType).join(',');
            } else {
              return [...typesArray, newType].join(',');                 
            }
          });
        };
        const removeTypes = () => {
          setFilterTypes([])
        } 

        // Filtre légendaire
        const checkoutLegendary = () => {
          if(filterLegendary === null && filterTypes.includes("CREATURE")) {
            setFilterLegendary("legendary")
          }
          else {
            setFilterLegendary(null)
          }
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
            <CheckboxRarity onClick={(event) => selectRarities(event.target.value)} filterRarities={filterRarities}
              onPush={removeRarities} text={"Remove rarity filter"}/>
            <CheckboxEdition onClick={(event) => selectEditions(event.target.value)} filterEditions={filterEditions}
              onPush={removeEditions} text={"Remove edition filter"}/>
            <CheckboxType onClick={(event) => selectTypes(event.target.value)} filterTypes={filterTypes}
              onPush={removeTypes} text={"Remove type filter"}/>
            {filterTypes === "CREATURE" &&(
              <CheckboxLegendary onClick={(event) =>checkoutLegendary()} filterLegendary={filterLegendary}/>
            )}
            </div>             

            <div className='card-section'>

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

export default CardsPage;