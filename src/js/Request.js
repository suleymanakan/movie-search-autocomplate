export class Request{
    constructor(url){
        this.url = url
    }
    async get(){
        const res = await fetch(this.url);
        const resData = await res.json();
        return resData;
    }
}
/** OOP yapısına uygun olması için,
 * Burda bir tane Request sınıfı yazıldı ve artık tüm servis çağrımları burdan yapılmaktadır */