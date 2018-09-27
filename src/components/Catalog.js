import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Catalog extends Component {
    constructor() {
        super()
        this.STORAGE_ID = "BUDGET"
        this.price = 3
        this.state = { searchedMovie: "", budget: ""}
    }

    saveToLocalStorage(budget) {
        localStorage.setItem(this.STORAGE_ID, budget)
    }

    getFromLocalStorage() {
        return localStorage.getItem(this.STORAGE_ID || 10)
    }

    changeMovieStatus = (e, id, sign) => {
        e.preventDefault()
        let budget = this.state.budget
        if (sign === "plus" && budget < this.price) {
            alert("not enough money")
            return
        }
        budget = sign === "plus" ? budget - this.price : budget + this.price
        this.saveToLocalStorage(budget)
        this.setState({ budget })
        this.props.changeMovieStatus(id)
    }

    componentDidMount() {
        let budget = this.getFromLocalStorage()
        this.setState({ budget })
    }

    showMovies = (movie, sign) => (
        <Link to={"/movies/" + movie.title} key={movie.id}>
            <div className="movie" style={{ backgroundImage: "url(" + movie.img + ")" }}>
                <button className={sign} onClick={(e) => this.changeMovieStatus(e, movie.id, sign)}></button>
            </div>
        </Link>)

    updateSearchedMovie = (event) => this.setState({
        searchedMovie: event.target.value
    })

    render() {
        let movies = [...this.props.movies]
        movies = movies.filter(m => m.title.toLowerCase().includes(this.state.searchedMovie.toLowerCase()))
        let moviesRented = movies.filter(m => m.isRented)
        let moviesNotRented = movies.filter(m => !m.isRented)
        return (
            <div>
                <div id="budget">Budget: {this.state.budget} </div>
                <div id="search-bar">
                    <span>Search Movie </span>
                    <input type="text" value={this.state.searchedMovie} onChange={this.updateSearchedMovie} />
                </div>
                {moviesRented.length ? <div id="rented-movies"><div>Rented Movies</div>
                    {moviesRented.map((movie) => this.showMovies(movie, "minus"))} </div> : null}
                <div id="catalog"><div>Catalog</div>
                    {moviesNotRented.length ? moviesNotRented.map((movie) => this.showMovies(movie, "plus")) : <div>Not found</div>}
                </div>
            </div>
        )
    }
}

export default Catalog
