import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(formBuilder: FormBuilder, public http: HttpClient, public router: Router) { 
    localStorage.removeItem('currentuser');
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
    let user = {
      email: this.myForm.controls.email.value,
      password: this.myForm.controls.password.value
    }
  
    this.http.post('http://localhost:3000/login', user).subscribe(
      (data)=> {
        localStorage.setItem(CURRENT_USER, JSON.stringify(data));
        console.log("Login successfully");  
        console.log("Current user" + data);
        this.router.navigate(["dashboard"]);
      },(error)=>{
        console.log(error)
        if (error.status == "400") {
          this.invalidLogin = true;
          this.errorMessage = 'The email address or password you have used is incorrect!';
        }
      }
      );
   
  }

}
