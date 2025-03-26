import BanniereMTG from "../assets/banniere.jpg"
import React from 'react';
import Section from '../components/section';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import CheckboxColor from '../components/checkboxColor'
import CheckboxFormat from '../components/checkboxFormat'
import CheckboxRarity from '../components/checkboxRarity'
import CheckboxType from '../components/checkboxType'
import CheckboxEdition from '../components/checkboxEdition'
import ButtonValid from '../components/buttonValid';


const NewCard = function () {

    const navigate = useNavigate();

    const [name, setName] = React.useState("")
    const [text, setText] = React.useState("")
    const [image, setImage] = React.useState("")
    const [manaCost, setManaCost] = React.useState("")
    const [value, setValue] = React.useState("")
    const [colors, setColors] = React.useState([])
    const [formats, setFormats] = React.useState([])
    const [type, setType] = React.useState("")
    const [legendary, setLegendary] = React.useState("")
    const [rarity, setRarity] = React.useState("")
    const [edition, setEdition] = React.useState("")
    const [completeState, setCompleteState] = React.useState(false)

    // Permt un choix multiple pour les couleurs

    const selectColors = (newColor) => {
        setColors(prevColors => {
          // Si la couleur existe déjà dans le tableau, on la retire
          if (prevColors.includes(newColor)) {
            return prevColors.filter(color => color !== newColor);  // Retire la couleur
          } else {
            return [...prevColors, newColor];  // Ajoute la couleur au tableau
          }
        });
      };

      const selectFormats = (newFormat) => {
        setFormats(prevFormats => {
          if (prevFormats.includes(newFormat)) {
            return prevFormats.filter(format => format !== newFormat);  
          } else {
            return [...prevFormats, newFormat];  
          }
        });
      };

    // Active le bouton
    useEffect(() => {
        const verifState = () => {
            if(name != "" && text !== "" && image !== "" && manaCost !== "" &&  value !== "" &&
                formats.length !== 0 && colors.length !== 0 && type !== "" && rarity !== "" && edition !== "") {
                    setCompleteState(true)
                }
        }
        verifState();
    },[name, text, image, manaCost, value, formats, colors, type, rarity, edition]);


    // Soumet le form 
    const handleSubmit = async (e) => {
        e.preventDefault();

            try{

                const card = {
                    name, 
                    text, 
                    image,
                    manaCost, 
                    value, 
                    formats,
                    colors, 
                    type, 
                    legendary, 
                    rarity, 
                    edition
                }
                console.log(card)

                const response = await axios.post('http://localhost:8080/f_admin/addCardTest', card); 
            

            }catch (e) {
                alert("Erreur 404")
            } 
        

    }
    
    return (
    <Section>
        <div className="card-container">
        <form className="card-form"> 
            <h2 className="p-log">Créer une carte</h2>
            <div className="input-group">
                <label >Nom :</label>
                <input type="text" id="nom" name="nom" onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="input-group">
                <label>Texte :</label>
                <input type="text" id="texte" name="texte" onChange={(e) => setText(e.target.value)}required/>
            </div> 
            <CheckboxColor 
                onClick={(event) => selectColors(event.target.value)} 
                filterColors={colors}
            />
            <CheckboxFormat 
                onClick={(event) => selectFormats(event.target.value)} 
                filterFormats={formats}
             />
            <div className="input-group">
                <label>Cout en mana :</label>
                <input type="number" id="cout-mana" name="cout-mana" onChange={(e) => setManaCost(e.target.value)}required/>
            </div>
            <div className="input-group">
                <label>Valeur € :</label>
                <input type="number" id="valeur" name="valeur" onChange={(e) => setValue(e.target.value)}required/>
            </div>
            <CheckboxType onClick={(event) => setType(event.target.value)} filterType={type} />
            {type === 'CREATURE' && (
                <div>
                    <label>Légendaire :</label>
                    <li><input type="checkbox" name={"legendary"}  onClick={() => setLegendary("legendary")} /> Oui
                    </li>
                    <li><input type="checkbox" name={"legendary"}  onClick={() => setLegendary("")}/> Non
                    </li>
                </div>
                )}
            <CheckboxRarity onClick={(event) => setRarity(event.target.value)} filterRarity={rarity} />
            <CheckboxEdition onClick={(event) => setEdition(event.target.value)} filterEdition={edition} />
            <ButtonValid text={"Valider"} disabled={!completeState} onClick={handleSubmit}/>

        </form>
        </div>
    </Section>
    )
}

export default NewCard