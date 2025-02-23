import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/section';
import CheckboxColor from '../components/checkboxColor'
import CheckboxFormat from '../components/checkboxFormat'
import axios from "axios";

const NewDeck = () => {

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
          const colorsArray = Array.isArray(prevColors) ? prevColors : (prevColors || '').split(',').filter(color => color.trim() !== '');
          if (colorsArray.includes(newColor)) {
            return colorsArray.filter(color => color !== newColor).join(',');
          } else {
            return [...colorsArray, newColor].join(',');                 
          }
        });
      };  

      // Validation colors
      const validColors = () => {
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

            console.log(response)
        }catch (e) {
            alert("Erreur 404")
        } // L'alert affiche les données et un message reçu du serveur par la requete response

        

    }
       
    console.log(colors)

    return (
    <Section>
        {colors.length === 0 && (
                <CheckboxColor
                    onClick={(event) => selectColors(event.target.value)}
                    filterColors={selectedColors}
                    onClick2={() => validColors()}
                />
            )}
        {colors.length != 0 && format === "" && (
                <CheckboxFormat
                    onClick={(event) => selectFormat(event.target.value)}
                    filterFormats={selectedFormat}
                    onClick2={() => validFormat()}
                />
            )}
        
    </Section>
);
}

export default NewDeck