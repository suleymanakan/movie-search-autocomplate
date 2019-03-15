import React from 'react';
class Movies extends React.Component {
    // bu componente  tüm filimler ekrana basılıyor.
    render() {
        return (
            <div className="container ">
            <div className="padTop_20">
            <div style={{width : "90% ", marginLeft:"30px" }} > 
                <label style={{float: "left",marginLeft:"15px" }} > </label>
                <label style={{float: "right", marginRight:"15px"}}>({this.props.movies.length}) Sonuç bulundu</label>
                <hr className="hr" />
            </div>
            
            {this.props.movies.map(movie =>
                        <div className="col-md-6 lft" key={movie.Title}>
                            <div>
                                <div className="card mb-3" style={{maxWidth: "500px", height:"280px"}}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={movie.Poster} className="card-img midImg" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{movie.Title}: Legacy ({movie.Year})</h5>
                                                <h5>{movie.imdbID}</h5>
                                                <ul className="list" >
                                                    <li className="list-item"><strong>Dil:</strong>{movie.Language}</li>
                                                    <li className="list-item"><strong>Oyuncular:</strong>{movie.Actors.substring(0, 18)}|<a href="#"> Tüm listeyi gör >></a></li>
                                                    <li className="list-item"> {movie.Plot.substring(0, 80)} <a href="#"> Detaylar >></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                 )} </div>  </div>
        )
    }
}

export default Movies;


/** 
  <div className="container">
                <div className="row padTop_20">
                    {this.props.movies.map(movie =>
                        <div className="col-md-6" key={movie.Title}>
                            <div>
                                <div className=" col-md-4 lft ">
                                    <img className="midImg" src={movie.Poster} />
                                </div>
                                <div className="col-md-8 lft">
                                    <h5>{movie.Title}: Legacy ({movie.Year})</h5>
                                    <h5>{movie.imdbID}</h5>
                                    <ul className="list" >
                                        <li className="list-item"><strong>Dil:</strong>{movie.Language}</li>
                                        <li className="list-item"><strong>Oyuncular:</strong>{movie.Actors}|<a href="#"> Tüm listeyi gör >></a></li><br />
                                        <li className="list-item"> {movie.Plot.substring(0,70)} <a href="#"> Detaylar >></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>  </div> 
 */