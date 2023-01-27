import { Router } from '@angular/router';
import { UserService } from './../../../services/firebase-services/user.service';
import { Component, OnInit } from '@angular/core';

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  faCircleInfo = faCircleInfo


  userRegisterData: any = {
    name: null,
    email: null,
    password: null
  }

  toastDisplay: boolean = false;
  toastErrorDisplay: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formulary: any) {
    var confirmPassword: any = document.getElementById('conf-password')

    if(this.userRegisterData.password == confirmPassword!.value) {
      console.log(formulary.value);
      
      this.userService.registerUser(formulary.value.email, formulary.value.password)
       .then(res => {
          this.toastDisplay = true

          // var submitBtn: any = document.querySelector("button[type='submit']")
          // submitBtn.setAttribute("disabled")

          updateProfile(res.user, {
            displayName: formulary.value.name
          }).then(() => {
            var dataToSendToFs = {
              name: res.user.displayName,
              email: res.user.email,
              uid: res.user.uid
              // ,desireList: null,
              // cartList: null
            }
  
            this.createUserDataOnFirestore(dataToSendToFs)
          }) 


          setTimeout(() => {
            this.toastDisplay = false
            this.router.navigate(['/login'])
          }, 3000)
        })
       .catch(err => {
         this.toastErrorDisplay = true
          console.log(err);
        })

    } else {
      console.log("ERROR - The two passwords doesn't match with each others."); 
    }
  }


  createUserDataOnFirestore(data: any) {
    this.userService.insertUserOnFirestore(data).then(() => {
      console.log("Dado inserido no Firestore com sucesso!");
      
    }).catch(err => console.log("Ocorreu um erro ao tentar inserir o dado no firestore: ", err))
  }

}
