import "./navbarUser.css";
import React from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const NavbarUser = function () {

    const token = localStorage.getItem('authToken');
    const [userCards, setUserCards] = React.useState(false)
    const [userDecks, setUserDecks] = React.useState(false)

    return (
        <nav className="nav">
            <a href="/actus"><p>Actus</p></a>
            <a href="/cards"><p>Cartes 
                { token !== null && (<SlArrowDown className="arrow-card" color="white" size="1em" onClick={() => setUserCards(!userCards)}
                    />)}</p></a>
            
            { userCards && (
                <div className="hv-card" style={{maxWidth: '18rem', border : '2px solid black',
                    padding: '5px', borderRadius : '5px', backgroundColor:'rgba(208,215,231,255)'}}>
                    <a href="/cards"><p>Cartes recherche avancée</p></a>
                    <a href="/cardsLiked"><p>Cartes likées</p></a> 
                </div>
            )}
            <a href="/decks"><p>Decks
            { token !== null && (<SlArrowDown className="arrow-deck" color="white" size="1em" onClick={() => setUserDecks(!userDecks)}
            />)}
            </p></a>
            { userDecks && (
                <div className="hv-card" style={{maxWidth: '18rem', border : '2px solid black',
                    padding: '5px', borderRadius : '5px', backgroundColor:'rgba(208,215,231,255)'}}>
                    <a href="/decks"><p>Decks recherche avancée</p></a>
                    <a href="/decksLiked"><p>Decks likés</p></a>
                    <a href="/addDeck"><p>Nouveau Deck</p></a>
                </div>
            )}
            <a href="/sign"><p>Espace personnel</p></a>
        </nav>
    )
}

export default NavbarUser
