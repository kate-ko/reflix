import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Catalog from './components/Catalog';
import MovieDetail from './components/MovieDetail';

// default users if local storage is empty
const USERS = [
  { id: 0, name: "Jasmin", color: "yellow", budget: 4, rentedMovies: [] },
  { id: 1, name: "Jake", color: "blue", budget: 10, rentedMovies: [] },
  { id: 2, name: "Jenny", color: "green", budget: 20, rentedMovies: [] },
  { id: 3, name: "Justin", color: "red", budget: 30, rentedMovies: [] }
]

class App extends Component {
  constructor() {
    super()
    this.price = 5
    this.STORAGE_ID = 'USERS'
    this.state = {
      currUserID: null, 
      movies: [
        { id: 0, isRented: false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
        { id: 1, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
        { id: 2, isRented: false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
        { id: 3, isRented: false, title: "The Sword in the Stone", year: 1963, img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
        { id: 4, isRented: false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
      ],
      users: [],
    }
  }

  saveToLocalStorage(users) {
    localStorage.setItem(this.STORAGE_ID, JSON.stringify(users))
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.STORAGE_ID)) || USERS
  }

  componentDidMount() {
    let users = this.getFromLocalStorage() 
    let apiKey = '129bd8e448d55867a7f500c11a64242f'
    this.setState({ users })
   // fetch('https://api.themoviedb.org/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22')
   // .then(results => results.json()).then(data => console.log(data))
  }

  // from rented to not rented and vv, "plus" sign to rent, "minus" to return
  changeMovieStatus = (id, sign) => {
    let { users, currUserIndex, movies, movieIndex, movieIndexInUsers } = this.getStateData(id)
    let price = sign === "plus" ? -this.price : this.price;

    if (users[currUserIndex].budget < this.price && sign === "plus") {
      alert("not enough money")
      return
    }

    (sign === "plus")? users[currUserIndex].rentedMovies.push(id) :
                       users[currUserIndex].rentedMovies.splice(movieIndexInUsers, 1);
    users[currUserIndex].budget += price
    movies[movieIndex].isRented = !movies[movieIndex].isRented
    this.saveToLocalStorage(users)
    this.setState({ users, movies })
  }

  // helper for changeMovieStatus
  getStateData(id) {
    let users = [...this.state.users]
    let currUserIndex = users.findIndex(u => u.id === this.state.currUserID)
    let movies = [...this.state.movies]
    let movieIndex = movies.findIndex(m => m.id === id)
    let movieIndexInUsers = users[currUserIndex].rentedMovies.findIndex(i => i === id)
    return { users, currUserIndex, movies, movieIndex, movieIndexInUsers }
  }

  selectUser = (id) => {
    if (this.state.currUserID === id) {
      return
    }
    let currUser = this.state.users.find(u => u.id === id)
    let movies = [...this.state.movies]
    movies.map(m => {
      m.isRented = currUser.rentedMovies.includes(m.id)? true : false
      return m
    })
    this.setState({ currUserID: id, movies })
  }

  // function to get name and budget of current user
  getCurrUser = () => {
    return this.state.users.find(u => u.id === this.state.currUserID) || { name: "", budget: "" }
  }

  render() {
    let { name, budget } = this.getCurrUser()

    return (
      <Router>
        <div className="App">
          <div id="main-links">
            <Link to="/"><span>Home</span></Link>
            <Link to="/about"><span>About</span></Link>
         </div>
          <div id="logo"><span>REFLIX</span></div>
          <div className="hello"> {name ? `Hello, ${name}` : null} </div>
          <div className="budget">{name ? `Budget: ${budget}` : null} </div>

          <Switch>
            <Route path="/" exact render={() => <Landing users={this.state.users} selectUser={this.selectUser} />} />

            <Route path="/catalog" exact render={() =>
              this.state.currUserID != null ?
                <Catalog movies={this.state.movies} changeMovieStatus={this.changeMovieStatus} /> :
                <Landing users={this.state.users} selectUser={this.selectUser} />
            } />

            <Route path="/movies/:id" exact render={({ match }) => {
              const movie = this.state.movies.find(m => m.id === parseInt(match.params.id,0))
              return <MovieDetail movie={movie} />
            }} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;


