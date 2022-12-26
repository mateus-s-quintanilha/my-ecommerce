import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getUsaZip(zip: string) {
   let usaZipUrl: string = `http://api.zippopotam.us/us/${zip}`
    return this.http.get<UsaZip>(usaZipUrl)   
  }



  getBrazilZip(zip: string) {
    let brazilZipUrl: string = `https://viacep.com.br/ws/${zip}/json/`

    return this.http.get<BrazilZip>(brazilZipUrl)
  }
}


interface UsaZip {
  "post code": string, 
  "country": string, 
  "country abbreviation": string, 
  "places": 
    [
      {"place name": string, 
        "longitude": string, 
        "state": string, 
        "state abbreviation": string, 
        "latitude": string
      }
    ]
}

// "post code": "90210", 
//   "country": "United States", 
//   "country abbreviation": "US", 
//   "places": [{
  //   "place name": "Beverly Hills", 
  //   "longitude": "-118.4065", 
  //   "state": "California", 
  //   "state abbreviation": "CA", 
  //   "latitude": "34.0901"
// }]


interface BrazilZip {
  "cep": string,
  "logradouro": string,
  "complemento": string,
  "bairro": string,
  "localidade": string,
  "uf": string,
  "ibge": string,
  "gia": string,
  "ddd": string,
  "siafi": string
}