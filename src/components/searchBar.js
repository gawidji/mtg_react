import "./css/searchBar.css"

const SearchBar = function (props) {
    return (
        <div className="input-group rounded">
        <input type="search" className="form-control rounded" placeholder="Nom" aria-label="Search"
        aria-describedby="search-addon" onChange={props.onChange}/>
            <i className="fas fa-search"></i>
        </div> )
}

export default SearchBar