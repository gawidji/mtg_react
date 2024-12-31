class Deck {
    constructor( id,  name, dateCreation, image, format, colors,
         manaCost, value, isPublic, deckBuilder, deckBuilderName, cartes, commander) {
    this.id = id;
    this.name = name;
    this.dateCreation = dateCreation;
    this.image = image;
    this.format = format;
    this.colors = colors;
    this.manaCost = manaCost;
    this.value = value;
    this.isPublic = isPublic;
    this.deckBuilder = deckBuilder;
    this.deckBuilderName = deckBuilderName;
    this.cartes = cartes;
    this.commander = commander;
}
}

export default Deck;