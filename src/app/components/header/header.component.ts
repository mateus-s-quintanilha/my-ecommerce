import { UserService } from './../../services/firebase-services/user.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { faUser, faUserCheck } from '@fortawesome/free-solid-svg-icons';

import {Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSearch = faSearch
  faShoppingCart = faShoppingCart
  faUser = faUser
  faUserCheck = faUserCheck

  public isCollapsed = true

  searchTerm: any;

  // @Input() itemsInCard!: number;
  itemsInCart!: number;

  logged: boolean = false;

  userInfo!: any;
  user1stName!: any;

  userUID!: any;
  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private fireAuth: Auth,
    private userService: UserService
  ) { 
    this.checkIfUserIsLogged()
    // this.userUID = this.fireAuth.currentUser!.uid
    this.getItemsInCart()
  }
  
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
        case "my-profile":
          document.getElementById('navbarDropdown')!.classList.add("active")
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

  logOut() {
    this.userService.logUserOut()
     .then(res => {
      //  this.router.navigate(['/'])
      window.location.reload()
     })
     .catch(err => {
        console.log(err);
     })
  }

  checkIfUserIsLogged() {
    onAuthStateChanged(this.fireAuth, (user) => {
      if(user) {
        this.logged = true
        this.userInfo = user
        this.user1stName = user.displayName?.split(' ')[0]
        console.log('user: ', user);
      } else {
        console.log('user not authenticated');
      }
    })
  }

  getItemsInCart() {

    onAuthStateChanged(this.fireAuth, (user) => {
      this.userService.getAllProductsOnCartList(user!.uid).subscribe((res) => {
        this.itemsInCart = res.length
      })
    })


  }


}
