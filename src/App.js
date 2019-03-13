import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';
import Movies from './js/Movies.js';
import AutoComplate from './js/Autocomplate';
import {Request} from './js/Request';


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
      const array = movie[0];
      if(array != null){
        for (let i = 0; i < array.length; i++) {
          /** Request sınıfından bir object türetildi ve bu object üzerinden istek yapılıyor */
          const response = new Request("http://www.omdbapi.com/?apikey=74d6d70e&t=" + array[i].Title)
          response.get()
          .then(data => {
           movies.push(data);
           this.setState({
            movies : movies })
          })
          .catch(err=>console.log(err)) 
        }
      }
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