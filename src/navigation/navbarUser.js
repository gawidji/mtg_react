import "./navbarUser.css";

const NavbarUser = function () {
    return (
        <nav className="nav">
 {/* <Link to="/actus"><p>Actus</p></Link>
<Link to="/cartes"><p>Cartes</p></Link>
<Link to="/deck"><p>Deck</p></Link>
<Link to="/log"><p>Espace personnel</p></Link> */}
 <a href="/actus"><p>Actus</p></a>
<a href="/cartes"><p>Cartes</p></a>
<a href="/deck"><p>Deck</p></a>
<a href="/log"><p>Espace personnel</p></a>


        </nav>
    )
}

export default NavbarUser
