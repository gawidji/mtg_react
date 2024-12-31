class User {
    constructor(id, pseudo, email, password, dateSign, avatar,
        activity, roles, decks){
        this.id = id;
		this.pseudo = pseudo;
		this.email = email;
		this.password = password;
		this.dateSign = dateSign;
		this.avatar = avatar;
		this.activity = activity;
		this.roles = roles;
		this.decks = decks;
        }
}

export default User;