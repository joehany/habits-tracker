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
import { ActivatedRoute } from "@angular/router";

const CURRENT_USER = "currentuser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private subscription: Subscription;
  id: string;
  email: string;
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public http: HttpClient, private activatedRoute: ActivatedRoute) { 
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
        console.log("Create new user successfully");
        console.log("Current user" + data);
      },(error)=>{
        console.log(error)
      }
      );
  }

  asyncCheckUserExistsValidator(control: FormControl): Promise<any> | Observable<any> {

    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          this.http.post('http://localhost:3000/:email', this.email).subscribe(
            (data)=> {
              if (data !== 'Example') {
                resolve({ 'invalid': true });
              } else {
                resolve(null);
              }
            }
            );


          
        }, 3000);
      }
    );
    return promise;
  }

}
