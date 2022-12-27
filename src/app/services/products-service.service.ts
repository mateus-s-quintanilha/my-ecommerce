import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  productsSelected: any[] = [];

  totalValue!: any;

  productsIdQty: any[] = [];

  constructor() { }

  addProductToUserList(id: number) {
    if(this.productsSelected.includes(id)) {
      return 
    } else {
      this.productsSelected.push(id)
    }
  }

  resetUserList() {
    this.productsSelected = []
  }

  totalProductsQtyAndValue(prodsArr: any[], total: any) {
    this.totalValue = total + 5

    prodsArr.forEach((prod) => {
      var obj = {
        prodId: prod.id,
        qty: prod.quantity
      }

      this.productsIdQty.push(obj)
    })
  }
}
