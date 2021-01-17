import React, { Component } from 'react'
import './MovieCard.css'

class MovieCard extends Component {
    
    renderButton = () => {
        const { 
            movie,
            nominations,
            nominationsFull,
            addMovie,
            removeMovie
        } = this.props
        
        if (!nominations) {
            return <button
                className="remove-button"
                onClick={() => removeMovie(movie)}
            >
                Remove
            </button>
        }
        
        const isNominated = nominations.find(m => m.imdbID === movie.imdbID)
        
        //If nominations full, nominated movies can still be removed.
        const shouldDisableButton = nominationsFull && !isNominated && nominations
        
        return isNominated ? 
            <button
                className="remove-button"
                onClick={() => removeMovie(movie)}
                disabled={shouldDisableButton} 
            >
                Remove
            </button> :
            <button
                className="add-button"
                onClick={() => addMovie(movie)}
                disabled={shouldDisableButton} 
            >
                Nominate
            </button>
    }
    
    render(){
        const { 
            movie
        } = this.props
        
        const { Title, Year, Poster } = movie
        return(
            <div className="card-wrapper">
                <div className="image-container">
                    <img className="card-image" src={Poster} alt={Title} />
                </div>
                <div className="body-container">
                    <div className="title">{Title}</div>
                    <div className="subtitle">{Year}</div>
                </div>
                <div className="footer-container">
                    {this.renderButton()}
                </div>
            </div>
        )
    }
}

export default MovieCard