import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiIntegrationService {

  // private urlAPI: string = 'https://fakestoreapi.com/products/3'
  private urlAPI: string = 'https://fakestoreapi.com/products'

  constructor(
    private http: HttpClient
  ) { }

    fetchApiData() {
      return this.http.get<any>(this.urlAPI)    
    }

}
