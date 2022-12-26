import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiIntegrationService } from 'src/app/services/api-integration.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-query-product',
  templateUrl: './query-product.component.html',
  styleUrls: ['./query-product.component.scss']
})
export class QueryProductComponent implements OnInit {

  paramOnURL!: string;

  prodsToShow!: any;

  faSearch = faSearch

  constructor(
    private route: ActivatedRoute,
    private service: ApiIntegrationService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParam: any) => {
      console.log("queryParam :", queryParam['qry'])

      this.paramOnURL = queryParam['qry']

      this.fetchMatchProducts(this.paramOnURL)
    })
  }

  fetchMatchProducts(term: string) {
    this.service.fetchApiData().subscribe((res: any) => {
      // if(!res) {}
      this.ocultStartDisplay()
      this.prodsToShow = res!.filter((prod: any) => prod.title?.toLowerCase().includes(term.toLowerCase()))

      console.log("this.prodsToShow: ", this.prodsToShow);
      
    })
  }


  ocultStartDisplay() {
    var rowList: any = document.getElementsByClassName('start-displaying')
    var arrayRowList = Array.from(rowList)
    arrayRowList.forEach((row: any) => {
      row.style.display = "none"
    })
  }

}
