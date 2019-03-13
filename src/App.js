import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';
import axios from 'axios';
import Movies from './js/Movies.js';
import AutoComplate from './js/Autocomplate';

class App extends Component {
  constructor() {
    super()
    this.moviesDetail = this.moviesDetail.bind(this);
    this.state = {
      movies: [],
    }
  } 
 /**Bir alt componentte filimler servisten çekilmişti. Ancak filimlerin kulanılabilir alanlarının çok kısıtlı olduğundan
  * Her filmin tüm verisini elde etmek için gelen filmler dizisi üzerinde Title ile sorgulama yapılark 
  * ilgili filmlerin tüm bilgileri elde edilmiştir.
  * SetTimeout yine alt componente olduğu gibi servisten gelen verileri bekliyor 
  */

  moviesDetail(movie) {
    const movies = [];
    setTimeout(() => {
      const array =  movie.movies;
      if(array != null){
        for (let i = 0; i < array.length; i++) {
          axios.get("http://www.omdbapi.com/?apikey=74d6d70e&t=" + array[i].Title)
          .then(data => {
           movies.push(data.data)
            this.setState({
              movies : movies
            })
          })
          .catch(err=>console.log(err))
        }
        
      }
    }, 100)
  }

  render() { 
    return (
      <Router>
        <div className="App ">
          <Switch>
            <Route path='/' exact component = {()=><AutoComplate moviesDetail={this.moviesDetail} movies={this.state.movies} />} />
            <Route path='/movies' exact component={()=><Movies movies={this.state.movies} />}  />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

const Error =()=>{return(<h4>Sayfa Bulunamadı</h4>)}