import "./css/searchBar.css"

const SearchBar = function () {
    return (
        <div className="input-group rounded">
        <input type="search" className="form-control rounded" placeholder="Nom" aria-label="Search" aria-describedby="search-addon"/>
        <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
        </span>
        </div> )
}

export default SearchBar