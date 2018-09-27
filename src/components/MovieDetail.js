import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class MovieDetail extends Component {
    constructor() {
        super()
    }
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