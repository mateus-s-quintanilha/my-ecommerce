import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSearch = faSearch

  faShoppingCart = faShoppingCart

  faUser = faUser

  public isCollapsed = true

  searchTerm: any;

  @Input() itemsInCard!: number;
  // itemsInCard: number = 2;

  constructor(
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getUrlParam()
  }

  getUrlParam() {
    this.route.url.subscribe((url: any) => {
      var path = url[0].path
      console.log('url in header: ', path)

      var prevEl = document.getElementsByClassName('active')[0]
      if(prevEl) prevEl.classList.remove("active")

      switch (path) {
        case "categories":
          // var prevEl = document.getElementsByClassName('active')[0]
          // prevEl.classList.remove("active")
          document.querySelectorAll(".nav-link").forEach((link: any) => {
            if(link.innerHTML == "Categories") {
              link.classList.add("active")
            }
          })
          break;
        case "home": 
          // var prevEl = document.getElementsByClassName('active')[0]
          // prevEl.classList.remove("active")
          document.querySelectorAll(".nav-link").forEach((link: any) => {
            if(link.innerHTML == "Home") {
              link.classList.add("active")
            }
          })
          break;
        case "cart":
          document.querySelectorAll(".nav-link").forEach((link: any) => {
            if(link.id == "cartIconlink") {
              link.classList.add("active")
            }
          })
          break;
        default:
          break;
      }
    })
  }

  submitQuery() {
    this.router.navigate(['/query'], {queryParams: {'qry': this.searchTerm}})
     .then(() => window.location.reload())
  }
}
