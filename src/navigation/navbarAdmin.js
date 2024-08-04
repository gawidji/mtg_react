import "./navbarAdmin.css";

const NavbarAdmin = function () {
    return (
        <nav className="nav">
<a href="/"><p>Déconnexion</p></a>
<a href="/admin/dataCartes"><p>Liste Cartes</p></a>
<a href="/admin/dataUsers"><p>Liste Users</p></a>
<a href="/admin/dataDeckUsers"><p>Liste Decks</p></a>


        </nav>
    )
}

export default NavbarAdmin