import { Router } from '@angular/router';

import { Component, OnInit, EventEmitter } from '@angular/core';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

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

  productCounter: any = "1";

  totalProductsPrice: number = 0;

  startDisplaying: boolean = true;

  changeProductPrices: EventEmitter<any> = new EventEmitter()

  constructor(
    private ProductsService: ProductsServiceService,
    private apiService: ApiIntegrationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("this.ProductsService.productsSelected: ", this.ProductsService.productsSelected)
    this.idArr = this.ProductsService.productsSelected
    this.getProductsOnCard()
  }

  getProductsOnCard() {
    this.apiService.fetchApiData().subscribe((res: any) => {
      this.startDisplaying = false
      this.idArr.forEach((id: any) => {
        res.forEach((prod: any) => {
          if(prod.id == id) {
            this.productsArr.push(prod)
          }
        })
      })

      if(this.productsArr.length == 0) {
        var message: any = document.querySelector('.empty-card-message')
        message.style = "opacity: 1; height: auto;"
      }

      this.ProductPriceDealer(this.productsArr)
      this.addQuantityKeyOnProducts(this.productsArr) 
      // console.log("this.productArr [NOVO]: ", this.productsArr);

      this.calculateTotalPrice(this.productsArr)
    })
  }

  addQuantityKeyOnProducts(productsArray: any[]) {
    productsArray.map((product: any) => {
      product['quantity'] = 1
    })
    // console.log("this.productArr [NOVO]", productsArray)
    
  }

  ProductPriceDealer(productsArray: any[]) {
    productsArray.map((product: any) => {

      var newPrice = product.price.toString()
      
      if(newPrice.includes(".")) {
  
        // this.productPrice = newPrice
        return
      } else {
        product.price = newPrice + ".99"
      }
    })
  }

  increaseCounter(product: any) {
    const baseProductPrice = product.price / product.quantity
    // var productCounterNUM = parseInt(this.productCounter)
    product.quantity += 1
    // this.productCounter = productCounterNUM.toString()

    product.price = (baseProductPrice * product.quantity).toFixed(2)

    // this.calculateTotalPrice(product.price)
    this.changeProductPrices.emit(this.priceListener())
  }


  decreaseCounter(product: any) {
    
    const baseProductPrice = product.price / product.quantity

    product.quantity -= 1

    product.price = (product.price - baseProductPrice).toFixed(2)
    if(product.quantity <= 1) {
      product.price = baseProductPrice.toFixed(2)
      product.quantity = 1
    }

    // this.calculateTotalPrice(product.price)
    this.changeProductPrices.emit(this.priceListener())
  }


  calculateTotalPrice(prodsArr: any[]) {
    
    prodsArr.map((product: any) => {
      if(typeof(product.price) === "string") {
        // console.log('é string');
        product.price = parseFloat(product.price)
      } else {
        // console.log('não é string');
      }
      this.totalProductsPrice += product.price
    })

    console.log("prodsArr: ", prodsArr);

    console.log("this.totalProductsPrice: ", this.totalProductsPrice);
    
  }

  priceListener() {
    var allPrices: number = 0;
    this.productsArr.forEach((product: any) => {
      console.log("product.price: ", product.price, typeof(product.price))
      allPrices += parseFloat(product.price)
    })
    this.totalProductsPrice = allPrices
    console.log('this.totalProductsPrice no riceListener(): ', this.totalProductsPrice.toFixed(2));
    
  }

  removeProduct(productId: any) {
    this.productsArr = this.productsArr.filter((product: any) => product.id != productId)
    console.log("this.productsArr.length: ", this.productsArr.length);
    
    if(this.productsArr.length <= 0) {
      var message: any = document.querySelector('.empty-card-message')
      message!.style! = "opacity: 1; height: auto;"
    }
  }

  navigateToPurchasePage() {
    this.ProductsService.totalProductsQtyAndValue(this.productsArr, this.totalProductsPrice)
    this.router.navigate(['/buying'])
  }


}
