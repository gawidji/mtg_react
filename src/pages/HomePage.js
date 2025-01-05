import "./css/HomePage.css"
import React from 'react';
import Section from "../components/section"; 
import BanniereMTG from "../assets/banniere.jpg"
import CarouselMTG2 from "../assets/mtgcaroussel2.jpg"
import CarouselMTG3 from "../assets/mtgcaroussel3.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = function () {
    return (
  <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={BanniereMTG} className="d-block w-100" alt="Image 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Première Image</h5>
            <p>Description de la première image.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={CarouselMTG2} className="d-block w-100" alt="Image 2" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Deuxième Image</h5>
            <p>Description de la deuxième image.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={CarouselMTG3} className="d-block w-100" alt="Image 3" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Troisième Image</h5>
            <p>Description de la troisième image.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Précédent</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Suivant</span>
      </button>
      </div>
  

  )
}

export default HomePage