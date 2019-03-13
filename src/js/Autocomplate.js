import React from 'react';
import PropTypes from 'prop-types';
import MoviesSearch from './MoviesSearch';
import {Request} from './Request';

class AutoComplate extends React.Component {
    constructor(){
        super()
        this.onChange = this.onChange.bind(this);
        this.state = {
            name : " ",
        }  
    }
    // PropType tanımı yapılarak gelecek olan propsların tiplerinin  ne olması gerektiğini belirtiyoruz
    static propType = {
        moviesDetail : PropTypes.array.isRequired,
        moviesDetail: PropTypes.func

    }
    
/** Bu fonksiyonda önce search inputuna girilen değeri alıyoruz.
 * Girilen veriye göre servisten filimler çekiliyor.
 * Ancak burda dikat edilmesi gereken en önemli nokta javaScriptin asekron yapısından dolayı
 * servisten gelmesi gereken verilerin zamanınada gelmemesidir.
 * Bu durumda kodlar ve algoritmalar boş objeler üzerinde dönüyor.Dolaysıyla veriler arayüze yansımıyor
 * Bu durumun önüne geçmek için javascriptin yeni özelikleri olan async-await yapısı kullanıldı.
 * setTimeout fonk. inputtan gelen veriyinin tamamlanması için saniyenin 4/10 oranında bekletirilmektedir.
 * Bunun Nedeni sürekli servis çağrımının önüne geçmektir. Bu şekilde performans iyileştirilmektedir
 *  Bu işlemi google de farklı sürelerde yapıyor

 */
  async  onChange(e){
        e.preventDefault();
        const value = e.target.value;
        const movies =[];
        this.setState({ [e.target.name]: e.target.value})
        if(this.state.name.length > 0){
        console.log(value)
        setTimeout(()=>{
             /** Request sınıfından bir object türetildi ve bu object üzerinden istek yapılıyor */
            const res = new Request("http://www.omdbapi.com/?apikey=74d6d70e&s="+value)
            res.get()
            .then(data =>{
                 movies.push(data.Search);
                 this.props.moviesDetail(movies);   })
            .catch(err=>console.log(err))
        },400)      
        }
      
    }
    render() {
        return ( <form>
            <div className="container d-flex justify-content-center">
            <div className="form-group auto-complate">
                <div className="input-group ">
                    <input type="text" id="movieSearh" name="name" value={this.state.value} onChange={this.onChange} className="form-control" placeholder="Bulmak istediğiniz filmin adını yazınız" />
                    <div className="input-group-append">
                        <button className="btn btn-info" type="button" >
                            <i id="icon" className="fa fa-search "></i>
                        </button>
                    </div>
                </div>
                {/** servisten aldığımız flimleri bir ekrana göstermek için
                 MoviesSearch componet'ına props olarak geçildi */}
                <MoviesSearch movies={this.props.movies}  />
                </div>
            </div>
            </form>
        )
    }
}
export default AutoComplate;