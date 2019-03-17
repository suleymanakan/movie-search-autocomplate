import React from "react";
import MoviesSearch from "./MoviesSearch";


class AutoComplate extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container d-flex justify-content-center">
          <div className="form-group auto-complate">
            <div className="input-group ">
              <input
                type="text"
                id="movieSearh"
                value={this.props.searchValue}
                onChange={this.props.onSearchBoxChange}
                className="form-control"
                placeholder="Bulmak istediğiniz filmin adını yazınız"
              />
              <div className="input-group-append">
                <button className="btn btn-info" type="button">
                  <i id="icon" className="fa fa-search " />
                </button>
              </div>
            </div>
            {/** servisten aldığımız flimleri bir ekrana göstermek için
                 MoviesSearch component'ına props olarak geçildi */}
            {this.props.movies.length > 0 ? (
              <MoviesSearch movies={this.props.movies} />
            ) : this.props.searchValue === "" ? null : (<div style={{color: "cyan", textAlign:"center"}} > <br/>
              <h5 > "{this.props.searchValue} " için sonuç bulunamadı</h5></div>
            )}
          </div>
        </div>
      </form>
    );
  }
}
export default AutoComplate;