import React from 'react'
import './SearchBar.css'

const SearchBar = ({ setSearchText, onSubmit, searchText }) => {
    return (
        <div className="search-wrapper">
            <form onSubmit={onSubmit}>
                <div className="search">
                    <input
                        className="round"
                        type="text"
                        value={searchText}
                        placeholder="Search for a movie to nominate..."
                        onChange={e => { setSearchText(e.target.value) }}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchBar