import { Component, OnInit } from '@angular/core';

import { ApiIntegrationService } from 'src/app/services/api-integration.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  eletronicProds!: any[];

  mensClothingProds!: any[];

  womensClothingProds!: any[];

  jeweleryProds!: any[];

  under30Prods!: any[]; 

  constructor(
    private service: ApiIntegrationService
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
  //     // 400: {
  //     //   items: 2
  //     // },

  //     570 : {
  //       items: 1
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
    loop: false,
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

      500 : {
        items: 1
      },

      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true,


    stagePadding: 50,
    // autoWidth: true
    // rtl: true
    
    // animateIn: true,
    // animateOut: "fadeOut"
  }

  customOptionsCategories: OwlOptions = {
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
      400: {
        items: 2
      },

      570 : {
        items: 2
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
    this.fetchEletronicProducts()
    this.fetchMensClothingProducts()
    this.fetchWomensClothingProducts()
    this.fetchJeweleryProducts()
    this.fetchUnder30DollarsProducts()
    this.adjustCarousel()
  }

  fetchEletronicProducts() {
    this.service.fetchApiData().subscribe((prods: any) => {

      this.ocultStartDisplay()
      this.eletronicProds = prods.filter((prod: any) => prod.category == "electronics" )
      
    })
  }

  fetchMensClothingProducts() {
    this.service.fetchApiData().subscribe((prods: any) => {

      this.ocultStartDisplay()
      this.mensClothingProds = prods.filter((prod: any) => prod.category == "men's clothing")
    })
  }

  fetchWomensClothingProducts() {
    this.service.fetchApiData().subscribe((prods: any) => {

      this.ocultStartDisplay()
      this.womensClothingProds = prods.filter((prod: any) => prod.category == "women's clothing")
    })
  }

  fetchJeweleryProducts() {
    this.service.fetchApiData().subscribe((prods: any) => {

      this.ocultStartDisplay()
      this.jeweleryProds = prods.filter((prod: any) => prod.category == "jewelery")
    })
  }

  fetchUnder30DollarsProducts() {
    this.service.fetchApiData().subscribe((prods: any) => {
      this.under30Prods = prods.filter((prod: any) => prod.price <= 30)

      console.log('this.under30Prods: ', this.under30Prods);
      
    })
  }

  ocultStartDisplay() {
    var rowList: any = document.getElementsByClassName('start-displaying')
    var arrayRowList = Array.from(rowList)
    arrayRowList.forEach((row: any) => {
      row.style.display = "none"
    })
  }


  adjustCarousel() {
    // if(window.innerWidth <= 500) {
    //   console.log('OLHA: window.innerWidth');
    // } if(window.outerWidth <= 500) {
    //   console.log('OLHA: window.outerWith');
    // } if(document.body.clientWidth <= 500) {
    //   console.log('OLHA: document.body.clientWidth');
    // } if(screen.availWidth <= 500) {
    //   console.log('OLHA: screen.availWidth')
    // } if(screen.width <= 500) {
    //   console.log('OLHA: screen.width');
    // }

    if(document.body.clientWidth <= 500) {
      this.customOptions.nav = false
    }
  }
}
