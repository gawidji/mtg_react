class Card {
    constructor ( id, name, text, image, manaCost, value, formats,
        colors, type, rarity, edition, decks,
         decksCommander) {
        this.id = id;
		this.name = name;
		this.text = text;
		this.image = image;
		this.manaCost = manaCost;
		this.value = value;
		this.formats = formats;
		this.colors = colors;
		this.type = type;
		this.rarity = rarity;
		this.edition = edition;
		this.decks = decks;
		this.decksCommander = decksCommander;
    }

}

export default Card;