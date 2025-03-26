import "./css/HomePage.css"
import React from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import axios from "axios";
import Section from "../components/section" 
import BanniereMTG from "../assets/banniere.jpg"
import LogoMTG from "../assets/LogoMTG.png"
import CarouselMTG2 from "../assets/mtgcaroussel2.jpg"
import CarouselMTG3 from "../assets/mtgcaroussel3.jpg"
import BackgroundTopCards from "../assets/mtg_wallpaper.jpg"
import { FaHeart  } from 'react-icons/fa';
import Card from '../model/Card';
import Deck from '../model/Deck';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = function () {

  const [cards, setCards] = React.useState([])
  const [decks, setDecks] = React.useState([])
  const navigate = useNavigate();

  const getTopCards = async () => {
    try {

       
        
        const response = await axios.get('http://localhost:8080/f_all/getTop3Cards' );
        
        const listCards = response.data.map(
                card => new Card (card.id, card.name, card.text, card.image, card.manaCost, card.value, card.formats,
                                card.colors, card.type, card.legendary, card.rarity, card.edition,
                                card.deckBuilders, card.decks, card.decksCommander, card.likeNumber,
                                card.deckNumber, card.commanderNumber
        ) )          

        setCards(listCards)

    }   
    catch (error) {
        console.log(error);
    }


}
React.useEffect(() => {
  getTopCards();
}, []);

const chooseCard = (id) => {
  navigate(`/cards/${id}`)
    };


    const getTopDecks = async () => {
      try {
           
          const response = await axios.get('http://localhost:8080/f_all/getTop3Decks' );
          
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
  React.useEffect(() => {
    getTopDecks();
  }, []);

const chooseDeck = (id) => {
    navigate(`/decks/${id}`)
      };


    return (
      <div className="body">
      <img src={BanniereMTG} className="d-block w-100" alt="Image 1" />
      <img src={LogoMTG} className="logo" alt="Image 2" />
      
        <h1 className="title-cards">Top Cartes</h1>  
        <div className="top-cards" style={{
            backgroundImage: `url(${BackgroundTopCards})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          }}>
        {cards.map(card => (
          <div className="card-details" key={card.id}>
                <img className="card-img" src={card.image} alt="Card-image" onClick={() => chooseCard(card.id)}/>
                <br/>
                <h2 className="card-likeNumber">{card.likeNumber} <FaHeart color="red"/></h2>
          </div>
            )
          )
        }
        </div>

        <h1 className="title-decks">Top Decks</h1>  
        <div className="top-decks" style={{
            backgroundImage: `url(${BackgroundTopCards})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          }}> 
        {decks.map(deck => (
          <div className="deck-details" key={deck.id}>
                <img className="deck-img" src={deck.image} alt="Card-image"/>
                <br/>
                <h2 className="deck-likeNumber">{deck.likeNumber} <FaHeart color="red"/></h2>
                <div className="deck-links">
                  <h2 className="deck-name" onClick={() => chooseDeck(deck.id)}>{deck.name}</h2> 
                  <h3 className="deck-deckBuilderName"> by {deck.deckBuilderName}</h3>
                </div>
                <br/>
          </div>
            )
          )
        }
        </div>
    </div>
  

  )
}

export default HomePage