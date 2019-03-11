import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MoviesSearch from './MoviesSearch';

class AutoComplate extends React.Component {
    constructor(){
        super()
        this.onChange = this.onChange.bind(this);
    }
    static propType ={
        moviesDetail : PropTypes.array.isRequired,
        moviesDetail: PropTypes.func

    }
    state = {
        movies:[],
        value : ''
    }
/** Bu fonksiyonda önce search inputuna girilen değeri alıyoruz.
 * Girilen veriye göre servisten filimler çekiliyor.
 * Ancak burda dikat edilmesi gereken en önemli nokta javaScriptin asekron yapısından dolayı
 * servisten gelmesi gereken verilerin zamanınada gelmemesidir.
 * Bu durumda kodlar ve algoritmalar boş objeler üzerinde dönüyor.Dolaysıyla veriler arayüze yansımıyor
 * Bu durumun önüne geçmek için setTimeout fonksiyonları en uygn zaman dilimleri ile kulanıldı.
 * En dıştaki Time fonk. inputan gelen veri 4/10 sn bekletirilmektedir.
 * Bunun Nedeni sürekli servis çağrımının önüne geçmektir. Bu işlemi google de farklı sürelerde yapıyor
 * içteki Time fonk. ise bir üst componentin fonk. boş veri göndermemesi için servisi beklemektedir. 
 */
    onChange(e){
        e.preventDefault();
        const value = e.target.value;
       setTimeout(()=>{
        axios.get("http://www.omdbapi.com/?apikey=74d6d70e&s="+value)
        .then(data=>{
          this.setState({
            movies: data.data.Search,
            value:value 
          });setTimeout(()=>{
            this.props.moviesDetail({...this.state})
          },300)
        })
       },400)
       
    }
    

    render() {
       
        
        return (
            <div className="container d-flex justify-content-center">
            <div className="auto-complate">
                <div className="input-group ">
                    <input type="text" id="movieSearh" onChange={this.onChange} className="form-control" placeholder="Bulmak istediğiniz filmin adını yazınız" />
                    <div className="input-group-append">
                        <button className="btn btn-info" type="button" >
                            <i id="icon" className="fa fa-search "></i>
                        </button>
                    </div>
                </div>
                
                <MoviesSearch movies={this.props.movies}  />
                </div>
            </div>
        )
    }
}
export default AutoComplate;