import { UserService } from 'src/app/services/firebase-services/user.service';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { faAngleRight, faEllipsisVertical, faLocationDot, faArrowAltCircleLeft, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.scss']
})
export class MyAddressComponent implements OnInit {

  faArrowAltCircleLeft = faArrowAltCircleLeft
  faLocationDot = faLocationDot
  faAngleRight = faAngleRight
  faEllipsis = faEllipsisVertical
  faXmark = faXmark
  faPenToSquare = faPenToSquare

  addressList!: any[];
  userName: any = this.fireAuth.currentUser!.displayName

  show: boolean = false;

  constructor(
    private fireAuth: Auth,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllAddresses()
  }

  getAllAddresses() {
    var userID = this.fireAuth.currentUser!.uid

    this.userService.getAllUserAddresses(userID).subscribe((res) => {
      this.show = false
      console.log('res no my-address: ', res);
      this.addressList = res
    })
  }

  removeAddress(dbID: any) {
    var userID = this.fireAuth.currentUser!.uid
    this.userService.removeUserAddress(dbID, userID).then((res) => {
      var alert = document.getElementById('alert')!
      alert.style.display = "block"
      setTimeout(() => {
        alert.style.display = "none"
      }, 3000)
      console.log('successfully deleted!');
    }).catch((err) => {
      console.log("error on delete address: ", err);
      
    })
  }

}
