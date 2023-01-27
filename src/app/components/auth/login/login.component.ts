import { Router } from '@angular/router';
import { UserService } from './../../../services/firebase-services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginData: any = {
    name: null,
    email: null,
    password: null
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onSubmit(form: any) {
    console.log(form.value);

    this.userService.loginUser(form.value.email, form.value.password)
     .then(res => {
       console.log(res)
       this.router.navigate(['/home'])
     })
     .catch(err => {
       console.log(err);
     })
  }


}
