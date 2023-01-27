import { Auth } from '@angular/fire/auth';
import { UserService } from './../../services/firebase-services/user.service';
import { Router } from '@angular/router';

import { Component, OnInit, EventEmitter } from '@angular/core';

import { faShoppingCart, faTintSlash } from '@fortawesome/free-solid-svg-icons';

import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ApiIntegrationService } from './../../services/api-integration.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  faShoppingCart = faShoppingCart

  idArr!: any[];

  productsArr: any[] = [];

  firstDecreaseBtn: boolean = true;

  // productCounter: any = "1";

  totalProductsPrice: number = 0;

  startDisplaying: boolean = true;

  changeProductPrices: EventEmitter<any> = new EventEmitter()

  constructor(
    private ProductsService: ProductsServiceService,
    private apiService: ApiIntegrationService,
    private router: Router,
    private userService: UserService,
    private auth: Auth
  ) { }

  ngOnInit(): void {
    // console.log("this.ProductsService.productsSelected: ", this.ProductsService.productsSelected)
    this.idArr = this.ProductsService.productsSelected
    this.getAllProductsOnCartList()
  }

  increaseCounterFS(product: any) {
    var userUID = this.auth.currentUser!.uid
    const baseProductPrice = product.price / product.quantity

    product.quantity += 1

    product.price = (baseProductPrice * product.quantity).toFixed(2)  
    this.userService.increaseProductOnCartQty(product.dbID, userUID, product.quantity, product.price)

    this.changeProductPrices.emit(this.priceListener(product.price))
  }

  decreaseCounterFS(product: any) {
    var userUID = this.auth.currentUser!.uid

    const baseProductPrice = product.price / product.quantity

    product.quantity -= 1

    product.price = (product.price - baseProductPrice).toFixed(2)
    if(product.quantity <= 1) {
      product.price = baseProductPrice.toFixed(2)
      product.quantity = 1
    }

    this.userService.decreaseProductOnCartQty(product.dbID, userUID, product.quantity, product.price)

    this.changeProductPrices.emit(this.priceListener(product.price))
  }

  priceListener(productsPrice: any[]) {
    var allPrices: number = 0;

    productsPrice.forEach((prod: any) => {
      prod.price = parseFloat(prod.price)
      allPrices += prod.price
    })
    this.totalProductsPrice = allPrices

    console.log('this.totalProductsPrice no priceListener(): ', this.totalProductsPrice);
  }

  navigateToPurchasePage() {
    console.log("this.productsArr no navigate: ", this.productsArr);
    console.log("this.totalProductsPrice no navigate: ", this.totalProductsPrice);
    
    // this.ProductsService.totalProductsQtyAndValue(this.productsArr, this.totalProductsPrice)
    this.router.navigate(['/buying'])
  }


  getAllProductsOnCartList() {
    var userUID: string = this.auth.currentUser!.uid
    
    this.apiService.fetchApiData().subscribe((res: any) => {
      this.startDisplaying = false

      this.userService.getAllProductsOnCartList(userUID).subscribe((products: any) => {
        console.log("getAllProductsOnCartList(): ", products);
        products.forEach((prod: any) => {
          res.forEach((prodOnAPI: any) => {
            if(prodOnAPI.id == prod.productID) {
              if(this.productsArr.find(obj => obj.id == prodOnAPI.id)) {
                return 
              } else {
                prodOnAPI["dbID"] = prod.docID
                prodOnAPI["quantity"] = prod.quantity  
                prodOnAPI["price"] = prod.totalPrice
                this.productsArr.push(prodOnAPI)
              }
            }
          })
        })
        this.priceListener(this.productsArr)
        console.log("productsArr certo: ", this.productsArr);

        if(this.productsArr.length == 0) {
          var message: any = document.querySelector('.empty-card-message')
          message.style = "opacity: 1; height: auto;"
        }
      })

    })
  }

  async removeFSProduct(dbID: any) {
    var userUID: string = await this.auth.currentUser!.uid

    this.productsArr = this.productsArr.filter((product: any) => product.dbID !== dbID)
    await this.userService.removeProductOnCartList(dbID, userUID)

    // console.log("this.productsArr.length: ", this.productsArr.length);
    
    if(this.productsArr.length <= 0) {
      var message: any = document.querySelector('.empty-card-message')
      message!.style! = "opacity: 1; height: auto;"
    }
  }

}
