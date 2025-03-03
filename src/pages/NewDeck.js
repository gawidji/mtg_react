import './css/NewDeck.css'
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import CheckboxColor from '../components/checkboxColor'
import CheckboxFormat from '../components/checkboxFormat'
import ButtonModif from '../components/buttonModif';
import axios from "axios";
import white from "../assets/white-mtg.png"
import blue from "../assets/blue-mtg.png"
import green from "../assets/green-mtg.png"
import red from "../assets/red-mtg.png"
import black from "../assets/black-mtg.png"
import defaultImg from "../assets/default_deck.png"

const NewDeck = () => {
    const navigate = useNavigate();
    
    // Change de valeur à la séléction
    const [selectedColors, setSelectedColors] = React.useState([])
    const [selectedFormat, setSelectedFormat] = React.useState("")
    const [selectedName, setSelectedName] = React.useState("")
    const [selectedImage, setSelectedImage] = React.useState("")


    // Change de valeur après validation
    const [colors, setColors] = React.useState([])
    const [format, setFormat] = React.useState("")
    const [name, setName] = React.useState("")
    const [image, setImage] = React.useState("")


    // Filtre colors
    const selectColors = (newColor) => {
      setSelectedColors(prevColors => {
        // Si la couleur existe déjà dans le tableau, on la retire
        if (prevColors.includes(newColor)) {
          return prevColors.filter(color => color !== newColor);  // Retire la couleur
        } else {
          return [...prevColors, newColor];  // Ajoute la couleur au tableau
        }
      });
    };
     

      // Validation colors
      const validColors = () => {
        console.log(selectedColors)
        setColors(selectedColors)
      }
       
      // Filtre format
      const selectFormat = (newFormat) => {
        setSelectedFormat(newFormat);
      };

      // Validation format
      const validFormat = () => {
        setFormat(selectedFormat)
      }

      // Validation name
      const validName = () => {
        setName(selectedName)
      }

      // Passer image
      const passImage = () => {
        setImage(defaultImg)
      }

       // Validation image
       const validImage = () => {
        setImage(selectedImage)
      }

      // Revenir au choix de format
      const returnFormat = () => {
        setFormat("");
      };

      // Revenir au choix des couleurs
      const returnColors = () => {
        setColors([]);
      };

      // Revenir au choix du nom 
      const returnName = () => {
        setName("");
      };
      

      const handleSubmit = async (e) => {
        e.preventDefault();

        const deck = {
            name,
            format,
            image,
            colors
        }

        try{
            const response = await axios.post('http://localhost:8080/f_user/addDeck', deck);          
            navigate(`/deckbuilding/${response}`)
        }catch (e) {
            alert("Erreur 404")
        } // L'alert affiche les données et un message reçu du serveur par la requete response

        

    }
       
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

               

    return (
    <Section>
        {colors.length === 0 && (
                <CheckboxColor
                    onClick={(event) => selectColors(event.target.value)}
                    filterColors={selectedColors}
                    onClick2={() => validColors()}
                />
            )}
        {colors.length !== 0 && format === "" && (
                <CheckboxFormat
                    onClick={(event) => selectFormat(event.target.value)}
                    filterFormats={selectedFormat}
                    onClick2={() => validFormat()}
                />
            )}
        {format !== "" && name === "" && (
          <div className="input-group">
                <label>Nommez votre deck :</label>               
                <input type="name" id="name" name="name" onChange={(e) => setSelectedName(e.target.value)}required/>
                <button onClick={() => validName()}>Valider</button>
          </div>
          )}
        {name !== "" && image === "" && (
          <div className="input-group">
                <label>Ajoutez une image :</label>
                <label>optionnel</label>
                <button onClick={() => passImage()}>Passer</button>             
                <button onClick={() => validImage()}>Valider</button>
          </div>
          )}
        {colors.length !== 0 && format !== "" && name !== "" && image !== "" && (
          <div className='card-deck'>
            <div className="new-deck">
                    <img className="deck-img" src={image} alt="Deck mtg"/>
                        <div className="card-body" >
                          <div className='name-line'>
                            <h1 className="card-name"> {name} <ButtonModif onClick={() => returnName()} /></h1>
                          </div>
                          <div className='color-line'>                        
                              <h2 className='color'> Couleurs : </h2> 
                              {colors && colors.length > 0 && Array.isArray(colors) && (
                                  <div className='mappingColor'>
                                    {colors.map((color)  => (
                                  <img src={getColor(color)} className="color-img-select" alt={color}/>                                
                              ))}
                                  <ButtonModif onClick={() => returnColors()} />
                                  </div>
                              )}
                          </div>
                          <div className='format-line'></div>               
                              <h2 className='format'> Format : </h2> 
                              <h2 className='card-format' style={{ backgroundColor: 'green' }}>{format}</h2>
                              
                              <ButtonModif onClick={() => returnFormat()} />
                          </div> 
                          
                        <button className='create-deck' onClick={() => handleSubmit()}>Créer le deck</button>
                        
                    </div>
          </div>

        )}
        
    </Section>
);
}

export default NewDeck