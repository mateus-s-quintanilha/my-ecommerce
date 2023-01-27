import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { faPlus, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  faUserPen = faUserPen
  faPlus = faPlus
  faArrowAltCircleLeft = faArrowAltCircleLeft

  userName!: any;
  userEmail!: any;
  userNumber!: any;


  constructor(
    private fireAuth: Auth,
  ) { }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.userName = this.fireAuth.currentUser!.displayName
    this.userEmail = this.fireAuth.currentUser!.email
    this.userNumber = this.fireAuth.currentUser!.phoneNumber

    console.log(this.fireAuth.currentUser);
    
  }

}
