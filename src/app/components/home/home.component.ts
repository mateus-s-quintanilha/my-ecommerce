import { ApiIntegrationService } from './../../services/api-integration.service';
import { Component, OnInit } from '@angular/core';

import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import { ProductsServiceService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faArrowCircleRight = faArrowCircleRight

  link1: string = '../../../assets/carousel-1.png'
  link2: string = '../../../assets/carousel-2.jpg'
  link3: string = 'https://i.ebayimg.com/images/g/T7oAAOSwZVhjhjJv/s-l960.webp'

  images = [this.link1, this.link2, this.link3];

  product1!: any;
  productList!: any[];
  bestSellerProduct!: any;

  // queryTerm!: any ;

  productsOnCart: number = 0;

  // productIdAddedToCart: any

  constructor(
    private ApiService: ApiIntegrationService,
    private ProductService: ProductsServiceService
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  
  getData() {
    this.ApiService.fetchApiData().subscribe((res: any) => {
      console.log("res: ", res)
   
      this.product1 = res[0]
      this.ocultStartDisplay()
      this.productList = res
      this.getBestSellers(this.productList)
    })
  }

  getBestSellers(productList: any[]) {
    this.bestSellerProduct = productList.filter((item: any) => {
      return item.rating.rate >= 4.5
    })

    console.log("this.bestSellerProduct: ", this.bestSellerProduct)
    
  }

  ocultStartDisplay() {
    var rowList: any = document.getElementsByClassName('start-displaying')
    var arrayRowList = Array.from(rowList)
    arrayRowList.forEach((row: any) => {
      row.style.display = "none"
    })
  }

  onAddToCardEvent(id: any) {
    this.productsOnCart += 1
    console.log("this.productsOnCart: ", this.productsOnCart, "id: ", id);

    // this.ProductService.productsSelected.push(id)
    this.ProductService.addProductToUserList(id)
  }

}
