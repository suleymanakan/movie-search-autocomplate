import React from "react";
class Movies extends React.Component {
  // Bu componente  tüm filimler ekrana basılıyor.
  render() {
    return (
      <div className="container "> 
      <div className="row padTop_20">
        <div className="header" >
          <label className="lblSearchValue">
            "{this.props.searchValue}" için sonuçlar
          </label>
          <label className="lblSearchLength" >
            ({this.props.movies.length}) Sonuç bulundu
          </label>
          <hr className="hr" />
        </div></div>
        <div className="row">
          {this.props.movies.map(movie =>
            movie.hasOwnProperty("Error") ? null : (
              <div
                className="card mb-3 pb-4 border-top-0 border-left-0 border-right-0"
                style={{
                  maxWidth: "540px",
                  display: "inline-block",
                  borderBottom: "2px solid lightgray",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0"
                }}
              >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={movie.Poster} className="card-img" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        {movie.Title}: Legacy ({movie.Year})
                      </h5>
                      <h5>{movie.imdbID}</h5>
                      <ul className="list">
                        <li className="list-item">
                          <strong>Dil:</strong>
                          {movie.Language}
                        </li>
                        <li className="list-item">
                          <strong>Oyuncular:</strong>
                          {movie.Actors.substring(0, 18)}|
                          <a href="#"> Tüm listeyi gör >></a>
                        </li>
                        <li className="list-item">
                          {" "}
                          {movie.Plot.substring(0, 80)}{" "}
                          <a href="#"> Detaylar >></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        
        </div>
      </div>
    );
  }
}

export default Movies;
