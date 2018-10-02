import React, { Component } from 'react';
import '../App.css';

class MovieDetail extends Component {
    render() {
        const movie = this.props.movie
        return (
            <div id="movie-container">
            <div>{movie.title}</div>
            <div><img src={movie.img} alt={movie.title}></img></div>
            <div className="desc">{movie.descrShort}</div>
            </div>
            )
    }
}

export default MovieDetail