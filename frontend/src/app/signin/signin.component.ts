import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

const CURRENT_USER = "currentuser";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myForm: FormGroup;
  invalidLogin = false;
  errorMessage = '';

  constructor(formBuilder: FormBuilder, public http: HttpClient, 
    public router: Router, public userService: UserService, private toastr: ToastrService) { 
    //localStorage.removeItem('currentuser');
    this.myForm = formBuilder.group({
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
      'password': ['', Validators.required]
      
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  ngOnInit() {
  }

  onSubmit() {
    let email = this.myForm.controls.email.value;
    let password = this.myForm.controls.password.value;

    this.userService.login(email, password).subscribe((data) => {
      if (this.userService.isLoggedIn) {
        this.toastr.success('Success message!', 'Login successfully!');
         this.router.navigate(['dashboard']);
       } else {
        this.invalidLogin = true;
        this.errorMessage = 'Log in error!';
       }
     },
     error => {
        console.log(error)
        this.invalidLogin = true;
        this.errorMessage = 'The email address or password is incorrect!';
     }
   );

  }

}
