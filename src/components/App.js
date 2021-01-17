import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import SearchBar from './SearchBar'
import MovieList from './MovieList'
import Banner from 'react-js-banner'

const requestUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}`

const MAX_NOMINATIONS = 5

class App extends Component {
    state = {
        searchText: "",
        loading: false,
        movies: [],
        nominations: []
    }
    
    setSearchText = searchText => {
        this.setState({ searchText })
    }
    
    searchMovie = e => {
        e.preventDefault()
        
        const { searchText } = this.state
        // if term is empty string do nothing
        if (!searchText) return

        this.setState({ loading: true }, () =>
            this.fetchMovieFromAPI(searchText)
        )
    }
    
    fetchMovieFromAPI = searchText => {
        axios.get(requestUrl, {
            params: {
                s: searchText
        }})
        .then(res => {
            this.setState({ movies: res.data.Search, searchText: '', loading: false })
        })
        .catch(err => {
                console.log(err)
                this.setState({ searchText: '', loading: false })
            }
        )
            
    }
    
    //Add movie to nomination list
    addMovie = movie => {
        this.setState(prevState => ({
            nominations: [...prevState.nominations, movie]
        }))
    }
    
    //Remove movie to nomination list
    removeMovie = movie => {
        this.setState(prevState => ({ 
            nominations: prevState.nominations.filter(m => m.Title !== movie.Title)
        }))
    }

    render() {
        const { 
            movies, 
            nominations, 
            searchText 
        } = this.state
        const nominationsFull = nominations.length >= MAX_NOMINATIONS
        return (
            <div className="App">
                <Banner 
                    title={"Thank you for your nominations!"}
                    showBanner={nominationsFull}
                    css={{ backgroundColor: 'black' }}
                />
                <div className="header">
                    <div className="header-text">The Shoppies</div>
                </div>
                <div className="body">
                    <div className="nominations-list">
                        <div className="nominations-header">
                            Your nominations
                        </div>
                        <MovieList
                            movies={nominations}
                            removeMovie={this.removeMovie}
                            nominationsFull={nominationsFull}
                        />
                    </div>
                    <div className="search-header">
                        <div className="search-text">
                            Movies
                        </div>
                        <SearchBar 
                            searchText={searchText}
                            setSearchText={this.setSearchText}
                            onSubmit={this.searchMovie}
                        />
                    </div>
                    <div className="search-list">
                        <MovieList 
                            nominations={nominations}
                            movies={movies}
                            addMovie={this.addMovie}
                            removeMovie={this.removeMovie}
                            nominationsFull={nominationsFull}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default App