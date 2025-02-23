import "./css/HomePage.css"
import React from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import axios from "axios";
import Section from "../components/section" 
import BanniereMTG from "../assets/banniere.jpg"
import CarouselMTG2 from "../assets/mtgcaroussel2.jpg"
import CarouselMTG3 from "../assets/mtgcaroussel3.jpg"
import BackgroundTopCards from "../assets/mtg_wallpaper.jpg"
import { FaHeart  } from 'react-icons/fa';
import Card from '../model/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = function () {

  const [cards, setCards] = React.useState([])
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
    return (
      <div className="body">
      
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
    </div>
  

  )
}

export default HomePage