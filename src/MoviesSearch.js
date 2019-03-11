import React from 'react';
import { Link } from 'react-router-dom';

class MoviesSearch extends React.Component {
    state = {
        durum: false,
        visible: 'show'
    }
    componentWillMount() {
        if (this.props != null) {
            this.setState({
                durum: true
            })

        }


    }
  render() {
        //props ile  gelen veriler  ekrana basılıyor
        const moviesArray = this.props.movies;
        return (<div className="auto-complate-search" >

            {moviesArray.slice(0, 1).map((movie) => {
                return (<div className="row padTop_20" key={movie.imdbID}>
                    <div className="col-md-4 ">
                        <img className="img " src={movie.Poster} />
                    </div>
                    <div className="col-md-8 detail ">
                        <h5>{movie.Title}: Legacy ({movie.Year})</h5>
                        <h5>{movie.imdbID}</h5>
                        <ul className="list">
                            <li className="list-item"><strong>Dil:</strong>{movie.Language}</li>
                            <li className="list-item"><strong>Oyuncular:</strong>{movie.Actors}</li><br />
                            <li className="list-item"><strong></strong> {movie.Plot}</li>
                        </ul>
                    </div>
                    <br /><hr />
                    <div className="btn"><Link to="/movies">
                        <button className="btn " id="btn" >DAHA FAZLA >></button>
                    </Link> </div>
                </div>
                )
            })
            }{}
        </div>)
    }
}
export default MoviesSearch;


  