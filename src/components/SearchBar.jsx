import React from 'react'
import "../styles/Details.scss"

function SearchBar (props) {

    return(
        <div className="searchBar">
            <input
                type="text"
                placeholder="Rechercher "
                onChange = {event => {props.searchState(event.target.value)}}
                />
        </div>
    )

}

export default SearchBar;