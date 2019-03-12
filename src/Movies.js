import React from 'react';
import { Link } from 'react-router-dom';

class Movies extends React.Component {
// bu componente  tüm filimler ekrana basılıyor.
    render() {
        console.log(this.props.movies)
        return (
            <div className="container">
                {this.props.movies.map(movie =>
                    <div className="row padTop_20">
                        
                            <div className=" col-md-2  ">
                                <img className="midImg" src={movie.Poster} />
                            </div>
                            <div className="col-md-4 ">
                                <h5>{movie.Title}: Legacy ({movie.Year})</h5>
                                <h5>{movie.imdbID}</h5>
                                <ul className="list">
                                    <li className="list-item"><strong>Dil:</strong>{movie.Language}</li>
                                    <li className="list-item"><strong>Oyuncular:</strong>{movie.Actors}|<a href="#"> Tüm listeyi gör >></a></li><br />
                                    <li className="list-item"><strong></strong> {movie.Plot} <a href="#"> Detaylar >></a></li>
                                </ul>
                            </div>
                            <div className="col-md-2  ">
                                <img className="midImg" src={movie.Poster} />
                            </div>
                            <div className="col-md-4 ">
                                <h5>{movie.Title}: Legacy ({movie.Year})</h5>
                                <h5>{movie.imdbID}</h5>
                                <ul className="list">
                                    <li className="list-item"><strong>Dil:</strong>{movie.Language}</li>
                                    <li className="list-item"><strong>Oyuncular:</strong>{movie.Actors} |<a href="#"> Tüm listeyi gör>></a></li><br />
                                    <li className="list-item"> {movie.Plot} <a href="#"> Detaylar >></a></li>
                                </ul>
                            </div>
                        <hr style={{ width: "80%", solid: "border", size: "5px", align: "center", color: "#f1f1f1" }}></hr>
                    </div>
                )}
             

            </div>
        )
    }
}

export default Movies;