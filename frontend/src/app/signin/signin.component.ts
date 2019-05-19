import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

const CURRENT_USER = "currentuser";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  myForm: FormGroup;

  constructor(formBuilder: FormBuilder, public http: HttpClient) { 
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
    console.log(user)
    this.http.post('http://localhost:3000/login', user).subscribe(
      (data)=> {
        localStorage.setItem(CURRENT_USER, JSON.stringify(data));
        console.log("Login successfully");
        console.log(data);
      }
      );
   
  }

}
