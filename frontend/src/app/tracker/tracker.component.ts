import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  showMsg: boolean = false;

  constructor(private myHttp: HttptrackerService, public router: Router, public toastr: ToastrService) {

  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.myHttp.postData('', form.value).subscribe(
      res => {
        this.toastr.success('Tracker created successfully!');
        this.router.navigate(['dashboard']);
      } ,
      err => console.log(err)
    );
  }

}
