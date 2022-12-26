import { Component, Input, OnInit } from '@angular/core';

import { ProductsServiceService } from './../../services/products-service.service';
import { ApiIntegrationService } from './../../services/api-integration.service';
import { ZipServiceService } from './../../services/zip-service.service';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.scss']
})
export class PurchasePageComponent implements OnInit {



  productsArr: any[] = [];

  userData: any = {
    name: null,
    email: null,
    location: null,
    zip: null,
    city: null,
    state: null,
    str: null,
    num: null,
  }

  totalValue!: any;

  QtyAndIdProds!: any[];

  totalProducts!: number;

  constructor(
    private ProductsService: ProductsServiceService,
    private APIservice: ApiIntegrationService,
    private zipService: ZipServiceService
  ) {
    this.getProductsToBuy()
    this.getProdArrObjsAndTotalValue()
  }
  
  ngOnInit(): void {
  }
  
  getProductsToBuy() {
    this.APIservice.fetchApiData().subscribe((products: any) => {
      this.ProductsService.productsSelected.forEach((SelectedProdID: any) => {
        products.filter((product: any) => {
          if(product.id == SelectedProdID) {
            this.productsArr.push(product)
          }
        })
      })
      console.log("produtos aqui no buying: ", this.productsArr)
    })
  } 

  getProdArrObjsAndTotalValue() {
    console.log("Array com ID e Quantidade dos produtos", this.ProductsService.productsIdQty)
    console.log("Valor total dos produtos", this.ProductsService.totalValue)

    this.QtyAndIdProds = this.ProductsService.productsIdQty

    this.totalValue = this.ProductsService.totalValue

    var totalQty = 0

    this.QtyAndIdProds.forEach((product: any) => {
      
      totalQty = totalQty + product.qty  
    }) 

    this.totalProducts = totalQty 
    
  }
  
  
  onSubmit(formulary: any) {
    console.log(formulary.value);
  }


  getUSAZip(zip: any, form: any) {
    var spinnerAnimation: any = document.getElementsByClassName('spinner')[0]
    spinnerAnimation!.style.display = "block"
    // this.zipService.getUsaZip("90210").subscribe((res: any) => {
    setTimeout(() => {
      this.zipService.getUsaZip(zip).subscribe((res: any) => {
        spinnerAnimation!.style.display = "none"
        console.log('res: ', res);
  
        this.populateData(form, res, null)
      }, (err: any) => {
        spinnerAnimation!.style.display = "none"
        this.resetAddressSection(form)
        var zipAlert = document.getElementById('zip-code-alert')
        zipAlert!.style.display = "block"
        setTimeout(() => {zipAlert!.style.display = "none"}, 2500)
      })
    }, 1000)
    // this.zipService.getUsaZip(zip).subscribe((res: any) => {
    //   spinnerAnimation!.style.display = "none"
    //   console.log('res: ', res);

    //   this.populateData(form, res, null)
    // }, (err: any) => {
    //   console.log("Deu erro!");
    // })
  }

  getBrazilZip(zip: any, form: any) {
    var spinnerAnimation: any = document.getElementsByClassName('spinner')[0]
    spinnerAnimation!.style.display = "block"

    setTimeout(() => {
      this.zipService.getBrazilZip(zip).subscribe((res: any) => {
        spinnerAnimation!.style.display = "none"
        console.log("res: ", res);

      
        this.populateData(form, null, res)
      
      }, (err: any) => {
        spinnerAnimation!.style.display = "none"
        this.resetAddressSection(form)
        var zipAlert = document.getElementById('zip-code-alert')
        zipAlert!.style.display = "block"
        setTimeout(() => {zipAlert!.style.display = "none"}, 2500)
      })
    }, 1000)
      // this.zipService.getBrazilZip(zip).subscribe((res: any) => {
      //   spinnerAnimation!.style.display = "none"
      //   console.log("res: ", res);

      
      //   this.populateData(form, null, res)
      
      // }, (err: any) => {
      //   console.log('Deu erro!');

      // })
  }

  populateData(form: any, usaZipObj?: any, brZipObj?: any) {
    if(usaZipObj) {

      form.form.patchValue({
        city: usaZipObj.places[0]["place name"],
        state: usaZipObj.places[0].state
      })
      

    } else if(brZipObj) {

      form.form.patchValue({
        zip: brZipObj.cep,
        city: brZipObj.localidade,
        state: brZipObj.uf,
        str: brZipObj.logradouro,
      })

    }
  }


  resetAddressSection(form: any) {
    form.form.patchValue({
      city: null,
      str: null,
      num: null,
      zip: null,
      state: null
    })
  }
}
