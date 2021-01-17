import React, { Component } from 'react'
import MovieCard from './MovieCard'
import './MovieList.css'

class MovieList extends Component {
    
    render(){
        const { movies, ...other } = this.props

        return(
            <React.Fragment>
                {movies?.length > 0 ? 
                    <div className="wrapper">
                        {movies.map((movie, i) => 
                            (<MovieCard
                                key={i}
                                movie={movie}
                                {...other}
                            />)
                        )}
                    </div> : (
                    <div className="no-results">
                        There are no movies to display
                    </div>)
                }
            </React.Fragment>
        )
    }
}

export default MovieList