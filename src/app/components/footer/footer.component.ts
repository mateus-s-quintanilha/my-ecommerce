import { Component, OnInit } from '@angular/core';

import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
// import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faTruckFast = faTruckFast
  faShield = faShieldHalved
  faCreditCard = faCreditCard

  constructor() { }

  ngOnInit(): void {
  }

}
