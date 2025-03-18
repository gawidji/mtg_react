import './css/NewDeck.css'
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import Pipeline from '../components/pipeline';
import CheckboxColor from '../components/checkboxColor'
import CheckboxFormat from '../components/checkboxFormat'
import ButtonModif from '../components/buttonModif';
import ButtonValid from '../components/buttonValid';
import ButtonPass from '../components/buttonPass';
import InputName from '../components/inputName';
import axios from "axios";
import white from "../assets/white-mtg.png"
import blue from "../assets/blue-mtg.png"
import green from "../assets/green-mtg.png"
import red from "../assets/red-mtg.png"
import black from "../assets/black-mtg.png"
import defaultImg from "../assets/default_deck.png"

const NewDeck = () => {
    
   const navigate = useNavigate();
      
    // Change de valeur à la sélection
    const [selectedColors, setSelectedColors] = React.useState([])
    const [selectedFormat, setSelectedFormat] = React.useState("")
    const [selectedName, setSelectedName] = React.useState("")
    const [selectedImage, setSelectedImage] = React.useState("")


    // Change de valeur après validation
    const [colors, setColors] = React.useState([])
    const [format, setFormat] = React.useState("")
    const [name, setName] = React.useState("")
    const [image, setImage] = React.useState("")


    // Choix colors
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
       
      // Choix format
      const selectFormat = (newFormat) => {
        setSelectedFormat(newFormat);
      };

      // Validation format
      const validFormat = () => {
        setFormat(selectedFormat)
      }

      // Choix name
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
      
      const token = localStorage.getItem('authToken');

      const handleSubmit = async () => {
        //e.preventDefault();
        /*
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          };
        */

        const deckRegister = {
            name,
            format,
            image,
            colors
        }

        try{
            const response = await axios.post('http://localhost:8080/f_user/addDeckTest', deckRegister); 
            const responseData = response.data
            navigate(`/deckbuilding`, { state: { deckID: responseData }}) 
        }catch (e) {
            alert("Erreur 404")
        }     
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
          <div className='color-group'>
                <div className='pipeline-container'>
                    <Pipeline style={{backgroundColor: '#5D3B8C', color:'#ffffff' }} text={"Couleurs"}/>
                    <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000' }} text={"Format"}/>
                    <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000'}} text={"Nom"}/>
                    <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000' }} text={"Image"}/>
                </div>
            <div className='color-container'>
                <CheckboxColor
                    onClick={(event) => selectColors(event.target.value)}
                    filterColors={selectedColors}
                /> 
                <ButtonValid disabled={selectedColors.length === 0} text={"Valider"} onClick={() => validColors()}/>
            </div>
          </div>
            )}
        {colors.length !== 0 && format === "" && (
          <div className='format-group'>
                <div className='pipeline-container'>
                  <Pipeline style={{backgroundColor: '#D3D3D3', color:'#000000' }} text={"Couleurs"}/>
                  <Pipeline style={{backgroundColor: '#5D3B8C', color: '#ffffff' }} text={"Format"}/>
                  <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000'}} text={"Nom"}/>
                  <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000' }} text={"Image"}/>
                </div>
                <CheckboxFormat
                    onClick={(event) => selectFormat(event.target.value)}
                    filterFormats={selectedFormat}                   
                />
                <ButtonValid disabled={selectedFormat === ""} text={"Valider"} onClick={() => validFormat()}/>
          </div>
            )}
        {format !== "" && name === "" && (
          <div className="name-group">
              <div className='pipeline-container'>
                  <Pipeline style={{backgroundColor: '#D3D3D3', color:'#000000' }} text={"Couleurs"}/>
                  <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000' }} text={"Format"}/>
                  <Pipeline style={{backgroundColor: '#5D3B8C', color: '#ffffff'}} text={"Nom"}/>
                  <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000' }} text={"Image"}/>
              </div>
              <div className='name-container'>
                  <InputName onChange={(e) => setSelectedName(e.target.value)} 
                  onClick={() => validName()} disabled={selectedName.length < 8 || selectedName.length > 15}/>
              </div>
                  <ButtonValid disabled={selectedName.length < 8 || selectedName.length > 15} 
                  text={"Valider"} onClick={() => validName()}/>
              

          </div>
          )} 
        {name !== "" && image === "" && (
          <div className="image-group">
                <div className='pipeline-container'>
                    <Pipeline style={{backgroundColor: '#D3D3D3', color:'#000000' }} text={"Couleurs"}/>
                    <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000' }} text={"Format"}/>
                    <Pipeline style={{backgroundColor: '#D3D3D3', color: '#000000'}} text={"Nom"}/>
                    <Pipeline style={{backgroundColor: '#5D3B8C', color: '#ffffff' }} text={"Image"}/>
                </div>
                <div className='buttons-container'>
                  <ButtonPass onClick={() => passImage()} text={"Passer"}/>             
                  <ButtonValid disabled={selectedImage === ""} text={"Valider"} onClick={() => validImage()}/>
                </div>
          </div>
          )}
      
        {colors.length !== 0 && format !== "" && name !== "" && image !== "" && (
          <div className='card-deck'>
            <div className="new-deck">
                <div className="img-container">
                    <img className="card-pp" src={image} alt="Deck mtg"/>
                </div>
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