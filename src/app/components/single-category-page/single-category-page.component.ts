import { ProductPageComponent } from './../product-page/product-page.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiIntegrationService } from 'src/app/services/api-integration.service';

@Component({
  selector: 'app-single-category-page',
  templateUrl: './single-category-page.component.html',
  styleUrls: ['./single-category-page.component.scss']
})
export class SingleCategoryPageComponent implements OnInit {

  dataToShow!: any;

  title!: string;

  constructor(
    private service : ApiIntegrationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      console.log('param: ', param);
      this.searchForCategory(param['category'])
    })
  }


  searchForCategory(param: any) {
    this.service.fetchApiData().subscribe((res: any) => {

      switch (param) {
        case 'under-30-dollars':
        this.dataToShow = res.filter((prod: any) => prod.price <= 30) 
          this.title = "Under USD $30"
          break;
        case 'jewelery':
          this.dataToShow = res.filter((prod: any) => prod.category == "jewelery")
          this.title = "Jewelery"
          break;
        case 'electronics':
          this.dataToShow = res.filter((prod: any) => prod.category == "electronics")
          this.title = "Electronics"
          break;
        case "mens-clothing": 
          this.dataToShow = res.filter((prod: any) => prod.category == "men's clothing")
          this.title = "Men's Clothing"
          break;
        case "womens-clothing":
          this.dataToShow = res.filter((prod: any) => prod.category == "women's clothing")
          this.title = "Women's Clothing"
          break;
        default:
          break;
      }

      console.log("this.dataToShow :", this.dataToShow)
      
    })
  }

  // fetchUnder30DollarsProducts() {
  //   this.service.fetchApiData().subscribe((prods: any) => {
  //     this.under30Prods = prods.filter((prod: any) => prod.price <= 30)

  //     console.log('this.under30Prods: ', this.under30Prods);
      
  //   })
  // }


}
