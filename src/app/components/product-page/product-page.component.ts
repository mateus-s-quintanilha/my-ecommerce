import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiIntegrationService } from './../../services/api-integration.service';

import { faStar as faStarSol } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  faArrowCircleRight = faArrowCircleRight
  faArrowCircleLeft = faArrowCircleLeft

  starFor1 = faStarSol
  starFor2 = faStarSol
  starFor3 = faStarSol
  starFor4 = faStarSol
  starFor5 = faStarSol
  faStarHalf = faStarHalfAlt

  product!: any;
  productRate!: any;
  similarProducts!: any;

  reviews!: number;

  productPrice!: any;

  constructor(
    private route: ActivatedRoute,
    private service: ApiIntegrationService,
  ) { }


  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 800,
  //   // navText: [`<i class='icon-chevron-left icon-white'><</i>`, `<fa-icon icon="${this.faArrowCircleLeft}"><fa-icon>`],
  //   navText: ['<span class="fas fa-chevron-left fa-2x"></span>','<span class="fas fa-chevron-right fa-2x"></span>'],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 3
  //     }
  //   },
  //   nav: true
  // }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 800,
    // navText: [`<i class='icon-chevron-left icon-white'><</i>`, `<fa-icon icon="${this.faArrowCircleLeft}"><fa-icon>`],
    navText: ['<span class="fas fa-chevron-left fa-2x"></span>','<span class="fas fa-chevron-right fa-2x"></span>'],
    responsive: {
      0: {
        items: 1
      },
      // 400: {
      //   items: 2
      // },

      570 : {
        items: 1
      },

      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }


  ngOnInit(): void {

    this.route.params.subscribe((param: any) => {
      console.log('param: ', param);
      this.searchForProduct(param['id'])
    })
  }

  searchForProduct(id: any) {
    this.service.fetchApiData().subscribe((list) => {
      this.product = list.filter((prod: any) => prod.id ==  id)[0]
      console.log('this.product: ', this.product)

      this.ProductPriceDealer(this.product.price)

      this.productRate = this.product.rating.rate

      // this.productRate = this.productRate.slice(".")[0]
      
      console.log("this.productRate: ", this.productRate, typeof(this.productRate));

      this.reviews = Math.round(this.product.rating.count / 2)

      this.ratingStars(this.productRate)
      this.getProductsOfSameCategory(this.product.category)
    })
  }


  ratingStars(rate: any) {
    
    if(rate == 5) {
      return 
    } else if(rate >= 4.5 && rate < 5) {
      this.starFor5 = faStarHalfAlt
    } else if(rate >= 4 && rate < 4.5) {
      this.starFor5 = faStarReg
    } else if(rate >= 3.5 && rate < 4) {
      this.starFor5 = faStarReg
      this.starFor4 = faStarHalfAlt
    } else if(rate >= 3 && rate < 3.5) {
      this.starFor5 = faStarReg
      this.starFor4 = faStarReg
    } else if(rate >= 2.5 && rate < 3) {
      this.starFor5 = faStarReg
      this.starFor4 = faStarReg 
      this.starFor3 = faStarHalfAlt
    } else if(rate >= 2 && rate < 2.5) {
      this.starFor5 = faStarReg
      this.starFor4 = faStarReg 
      this.starFor3 = faStarReg
    } else if(rate >= 1.5 && rate < 2) {
      this.starFor5 = faStarReg
      this.starFor4 = faStarReg 
      this.starFor3 = faStarReg
    } else if(rate >= 1 && rate < 1.5) {
      this.starFor5 = faStarReg
      this.starFor4 = faStarReg 
      this.starFor3 = faStarReg
      this.starFor2 = faStarHalfAlt
    } else if(rate <= 1) {
      this.starFor5 = faStarReg
      this.starFor4 = faStarReg 
      this.starFor3 = faStarReg
      this.starFor2 = faStarReg
    }

  }

  getProductsOfSameCategory(category: any) {

    this.service.fetchApiData().subscribe((res: any) => {
      this.similarProducts = res.filter((prod: any) => prod.category == category)

      console.log("similarProducts: ", this.similarProducts)
      
    })
    
  }

  ProductPriceDealer(price: any) {
    var newPrice = price.toString()
    // console.log("price: ", newPrice, typeof(newPrice));
    
    if(newPrice.includes(".")) {
      // console.log('é float!');

      this.productPrice = newPrice
    } else {
      // console.log('não é float!');
      
      this.productPrice = newPrice + ".99"
    }
  }

}
