import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faPlusCircle, faMinusCircle)

class Catalog extends Component {
  constructor() {
    super()
    this.state = { searchedMovie: "" }
  }

  updateSearchedMovie = (event) => this.setState({
    searchedMovie: event.target.value
  })

  changeMovieStatus = (e, id, sign) => {
    e.preventDefault()
    this.props.changeMovieStatus(id, sign)
  }

  renderMovie = (movie, sign) => {
    let icon = sign === "plus" ? <FontAwesomeIcon icon="plus-circle" size="2x"/> :
      <FontAwesomeIcon icon="minus-circle" size="2x"/>;
    return <Link to={`/movies/${movie.id}`} key={movie.id}>
      <div className="movie" style={{ backgroundImage: "url(" + movie.img + ")" }}>
        <button onClick={(e) => this.changeMovieStatus(e, movie.id, sign)}>
          {icon}
        </button>
      </div>
    </Link>
  }

  getMoviesFromProps() {
    let movies = [...this.props.movies]
    movies = movies.filter(m => m.title.toLowerCase().includes(this.state.searchedMovie.toLowerCase()))
    let moviesRented = movies.filter(m => m.isRented)
    let moviesNotRented = movies.filter(m => !m.isRented)
    return { moviesRented, moviesNotRented }
  }

  render() {
    let { moviesRented, moviesNotRented } = this.getMoviesFromProps()

    return (
      <div>
        <div id="search-bar">
          <input type="text" placeholder="Search movie..." value={this.state.searchedMovie} onChange={this.updateSearchedMovie} />
        </div>

        {moviesRented.length ? <div id="rented-movies"><div>Rented Movies</div>
          {moviesRented.map((movie) => this.renderMovie(movie, "minus"))} </div> : null}

        <div id="catalog"><div>Catalog</div>
          {moviesNotRented.length ? moviesNotRented.map((movie) => this.renderMovie(movie, "plus")) :
            <div>Not found</div>}
        </div>
      </div>
    )
  }
}

export default Catalog
