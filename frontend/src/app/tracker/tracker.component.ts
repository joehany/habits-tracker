import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../services/httptracker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  showMsg: boolean = false;
  defaultDate: Date = new Date();
  constructor(private myHttp: HttptrackerService, public router: Router, public toastr: ToastrService, private titleService: Title) {
    this.titleService.setTitle('Create Tracker');
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
