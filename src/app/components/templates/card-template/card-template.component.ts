import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss']
})
export class CardTemplateComponent implements OnInit {

@Input() productOnCard: any;

productPrice!: any;

prodsOnCart: number = 0;

@Output() addToCardEvent: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.ProductPriceDealer(this.productOnCard.price)
  }

  ProductPriceDealer(price: any) {
    var newPrice = price.toString()
    
    if(newPrice.includes(".")) {
      // console.log('é float!');

      this.productPrice = newPrice
    } else {
      // console.log('não é float!');
      
      this.productPrice = price + 0.99
    }
  }

  addToCart() {
    // this.prodsOnCart = this.prodsOnCart + 1
    // ++ this.prodsOnCart

    // this.prodsOnCart += 1
    // console.log("this.prodsOnCart: ", this.prodsOnCart);

    // this.addToCardEvent.emit({ event, id: this.productOnCard?.id })
    // this.addToCardEvent.emit( this.productOnCard?.id )
    
  }

}
