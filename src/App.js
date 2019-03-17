import React, { Component } from "react";
import "./css/App.css";
import "./css/Movies.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Movies from "./js/Movies.js";
import AutoComplate from "./js/Autocomplate";
import { Request } from "./js/Request";
import { debounce } from "lodash";

class App extends Component {
  constructor() {
    super();
    this.moviesDetail = this.moviesDetail.bind(this);
    this.state = {
      movies: [],
      searchValue: ""
    };
  }
  /**searchDebounce fonk. filimler servisten çekilmiştir.
   *  Ancak filimlerin kulanılabilir alanlarının çok kısıtlı olduğundan
   * Her filmin tüm verisini elde etmek için gelen filmler dizisi üzerinde Title ile sorgulama yapılark
   * ilgili filmlerin tüm bilgileri elde edilmiştir.
   */

  moviesDetail(movieList) {
    const movies = [];
    if (movieList.length > 0) {
      for (let i = 0; i < movieList.length; i++) {
        /** Request sınıfından bir object türetildi ve bu object üzerinden  her bir film için Title parametresiyle istek yapılıyor */
        const response = new Request("http://www.omdbapi.com/?apikey=74d6d70e&t=" + movieList[i].Title);
        response.get()
          .then(data => {
            movies.push(data);
            this.setState({
              movies
            });
          })
          .catch(err => console.log(err));
      }
    }
  }
  /**Bir alt componente search inputuna girilen değer  alınmaktadır. */
  onSearchBoxChange = e => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({
       searchValue: value,
       movies: [] 
      });
    this.searchDebounce(); 
  };
 /** Bu fonksiyonda Autocomplate componentındaki search inputuna girilen değere göre apiye istek yapıyoruz.
 * Girilen veriye göre servisten filimler çekiliyor.
 * Ancak burda dikat edilmesi gereken en önemli nokta javaScriptin asekron yapısından dolayı
 * servisten gelmesi gereken verilerin zamanınada gelmemesidir.Bu durumda kodlar ve algoritmalar boş objeler üzerinde dönüyor.Dolaysıyla veriler arayüze yansımıyor
 * Bu durumun önüne geçmek için javascriptin yeni özelikleri olan async-await yapısı kullanıldı.
 * debounce fonk. inputtan gelen veriyinin tamamlanması için saniyenin 2/10 oranında bekletirilmektedir.
 * Bunun Nedeni sürekli servis çağrımının önüne geçmektir. Bu şekilde performans iyileştirilmektedir

 */
  searchDebounce = debounce(()=> {
    const movies = [];
    if (this.state.searchValue.length > 0) {
      /** Request sınıfından bir object türetildi ve bu object üzerinden istek yapılıyor */
      const response = new Request("http://www.omdbapi.com/?apikey=74d6d70e&s=" + this.state.searchValue);
      response.get()
        .then(data => {
          movies.push.apply(movies, data.Search);
          this.moviesDetail(movies);
        })
        .catch(err => console.log(err));
    }
  }, 200);

  render() {
    return (
      <Router>
        <div className="App ">
          <Switch>
            <Route path="/" exact
              render={() => (
                <AutoComplate
                  movies={this.state.movies}
                  searchValue={this.state.searchValue}
                  onSearchBoxChange={this.onSearchBoxChange}
                />
              )}
            />
            <Route path="/movies" exact
              render={() => (
              <Movies
               movies={this.state.movies}
               searchValue={this.state.searchValue} />)} 
              />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

const Error = () => {
  return <h4>Sayfa Bulunamadı</h4>;
};