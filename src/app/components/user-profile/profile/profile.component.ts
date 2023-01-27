import { UserService } from 'src/app/services/firebase-services/user.service';
import { Component, OnInit } from '@angular/core';

import { faUser, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faUser = faUser

  faUserLarge = faUserLarge

  faLocation = faLocationDot

  faAngleRight = faAngleRight

  faListUl = faListUl

  userName!: any;

  constructor(
    private fireAuth: Auth,
    private userService: UserService
  ) { 
    this.getCurrentUser()
  }

  ngOnInit(): void {
  }

  getCurrentUser() {
    console.log("this.fireAuth.currentUser: ", this.fireAuth.currentUser);
    
    this.userName = this.fireAuth.currentUser!.displayName
  }

}
