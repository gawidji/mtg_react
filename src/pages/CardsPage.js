import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import SearchBar from '../components/searchBar';
import CheckboxColor from '../components/checkboxColor';
import Card from '../model/Card';
import axios from "axios";
import "./CardsPage.css";

const CardsPage = () => {
    const [cards, setCards] = React.useState([])
    const [detailsCard, setDetailsCard] = React.useState(null)
    const navigate = useNavigate();

    // Filtre recherche
    const [filterName, setFilterName] = React.useState("")

/*
    const [name, setName] = React.useState("")
    const [manaCostMin, setManaCostMin] = React.useState(null)
    const [manaCostMax, setManaCostMax] = React.useState(null)
    const [valueMin, setValueMin] = React.useState(null)
    const [valueMax, setValueMax] = React.useState(null)
    const [formats, setFormats] = React.useState([])
    const [colors, setColors] = React.useState([])
    const [types, setTypes] = React.useState([])
    const [rarities, setRarities] = React.useState([])
    const [editions, setEditions] = React.useState([])
*/

    
        // L'appel asynchrone doit obligatoirement etre fait à l'intérieur de useEffect
        useEffect(() => {
        const getCards = async () => {
            try {

                // Contient les RequestParams de la requete
                const params = {
                    name: filterName,
                   // colors: selectedColors
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
        getCards();
        }, [filterName]);


        const chooseCard = (id) => {
        navigate(`/cards/${id}`)
          };
        
        

          const hoveredCard = (id, name, type, text) => {
            setDetailsCard({ id, name, type, text });

          }
 

        return (
            <Section className="section">

            <SearchBar className='search-bar'  onChange={(e) => setFilterName(e.target.value)} required/>
            <CheckboxColor className='checkbox-color'/>
            

            <div className='card-section'>

              {cards.map(card => ( 
                  <div className="card-details" key={card.id}>
                      <img className="card-img" src={card.image} alt="Card image" onClick={() => chooseCard(card.id)} 
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