import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

const CURRENT_USER = "currentuser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  invalidRegister = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, public http: HttpClient, public route: Router) { 
    
    this.myForm = formBuilder.group({
      'name': ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{1,15}$")]],
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
    let newUser = {
      name: this.myForm.controls.name.value,
      email: this.myForm.controls.email.value,
      password: this.myForm.controls.password.value
    }
    
    this.http.post('http://localhost:3000/signup', newUser).subscribe(
      (data)=> {
        localStorage.setItem(CURRENT_USER, JSON.stringify(data));
        this.route.navigate(['dashboard']);
        console.log("Create new user successfully! " + "New User: " + newUser.email);
      },(error)=>{
        console.log(error.error)
        if (error.status == "422") {
          this.invalidRegister = true;
          this.errorMessage = 'The email address you have used is already registered!';
        }
      }
      );
  }


}
