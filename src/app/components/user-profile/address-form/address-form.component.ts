import { UserService } from 'src/app/services/firebase-services/user.service';
import { ZipServiceService } from './../../../services/zip-service.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  editPage: boolean = false;

  userAddressData: any = {
    name: this.fireAuth.currentUser!.displayName,
    email: this.fireAuth.currentUser!.email,
    location: null,
    zip: null,
    city: null,
    state: null,
    str: null,
    num: null,
  }

  userEditAddressData: any = {
    name: this.fireAuth.currentUser!.displayName,
    email: this.fireAuth.currentUser!.email,
    location: null,
    zip: null,
    city: null,
    state: null,
    str: null,
    num: null,
  }

  addressID!: any;


  title!: string;  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireAuth: Auth,
    private zipService: ZipServiceService,
    private userService: UserService
  ) { 
    this.getRoute() 
  }

  ngOnInit(): void {
  }

  getRoute() {
    this.route.url.subscribe((res: any) => {
      console.log('aqui no address-form: ', res);

      if(res[2].path == 'add') {
        this.title = 'Add Address'
        

      } else {
        this.title = 'Edit Address'
        this.editPage = true
        this.populateEditData()
      }
    })

  }


  onSubmit(form: any) {
    this.addAddressToDoFirestore(form.value)
    window.scrollTo(0, 0);
    document.getElementById('alert')!.style.display = "block"
    setTimeout(() => {
      this.router.navigate(['/my-profile/my-address'])
    }, 3000)
  }

  addAddressToDoFirestore(formData: any) {
    var userID = this.fireAuth.currentUser!.uid
    this.userService.insertUserAddress(userID, formData.location, formData.zip, formData.city, formData.state, formData.str, formData.num)
  }


  getUSAZip(zip: any, form: any) {
    var spinnerAnimation: any = document.getElementsByClassName('spinner')[0]
    spinnerAnimation!.style.display = "block"
    // this.zipService.getUsaZip("90210").subscribe((res: any) => {
    setTimeout(() => {
      this.zipService.getUsaZip(zip).subscribe((res: any) => {
        spinnerAnimation!.style.display = "none"
        // console.log('res: ', res);
  
        this.populateData(form, res, null)
      }, (err: any) => {
        spinnerAnimation!.style.display = "none"
        this.resetAddressSection(form)
        var zipAlert = document.getElementById('zip-code-alert')
        zipAlert!.style.display = "block"
        setTimeout(() => {zipAlert!.style.display = "none"}, 2500)
      })
    }, 1000)
  }

  getBrazilZip(zip: any, form: any) {
    var spinnerAnimation: any = document.getElementsByClassName('spinner')[0]
    spinnerAnimation!.style.display = "block"

    setTimeout(() => {
      this.zipService.getBrazilZip(zip).subscribe((res: any) => {
        spinnerAnimation!.style.display = "none"
        // console.log("res: ", res);

      
        this.populateData(form, null, res)
      
      }, (err: any) => {
        spinnerAnimation!.style.display = "none"
        this.resetAddressSection(form)
        var zipAlert = document.getElementById('zip-code-alert')
        zipAlert!.style.display = "block"
        setTimeout(() => {zipAlert!.style.display = "none"}, 2500)
      })
    }, 1000)
  }

  populateData(form: any, usaZipObj?: any, brZipObj?: any) {
    if(usaZipObj) {

      form.form.patchValue({
        city: usaZipObj.places[0]["place name"],
        state: usaZipObj.places[0].state
      })
      

    } else if(brZipObj) {

      form.form.patchValue({
        zip: brZipObj.cep,
        city: brZipObj.localidade,
        state: brZipObj.uf,
        str: brZipObj.logradouro,
      })

    }
  }


  resetAddressSection(form: any) {
    form.form.patchValue({
      city: null,
      str: null,
      num: null,
      zip: null,
      state: null
    })
  }


  onSubmitEdit(form: any) {
    this.editAddressOnFirestore(form.value)
    window.scrollTo(0, 0);
    document.getElementById('edit-alert')!.style.display = "block"
    setTimeout(() => {
      this.router.navigate(['/my-profile/my-address'])
    }, 3000)
  }

  populateEditData() {
    var userID = this.fireAuth.currentUser!.uid
    this.route.params.subscribe((res) => {
      console.log('params no address-form edit: ', res['id']);
      this.addressID = res['id']
      
      this.userService.getSpecificUserAddress(this.addressID, userID).subscribe((res) => {
        console.log('address que pegamos na url: ', res)
        
        var addressData: any = res
        this.userEditAddressData = {
          name: this.fireAuth.currentUser!.displayName,
          email: this.fireAuth.currentUser!.email,
          location: addressData.location,
          zip: addressData.zip,
          city: addressData.city,
          state: addressData.state,
          str: addressData.street,
          num: addressData.number,
        }
      })
    })
  }

  editAddressOnFirestore(formValue: any) {
    var userID = this.fireAuth.currentUser!.uid
    this.userService.editUserAddress(this.addressID, userID, formValue).then(((res) => {
      console.log('users address edited succesfully!');
      

    })).catch((err) => {
      console.log('error on editing users address: ', err);
      
    })
  }

}
