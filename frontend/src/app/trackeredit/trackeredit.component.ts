import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../services/httptracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trackeredit',
  templateUrl: './trackeredit.component.html',
  styleUrls: ['./trackeredit.component.css']
})
export class TrackereditComponent implements OnInit {
  showMsg: boolean = false;
  message: string;
  _id: any;
  startDateFormat: string;

  tracker: any = {
    title: '',
    monitorFor: '',
    startDate: '',
    timesPerDay: '',
    daysPerWeek: ''
  }

  constructor(public myHttp: HttptrackerService, public route: ActivatedRoute,
    public router: Router, public toastr: ToastrService, private titleService: Title) {
      this.titleService.setTitle('Edit Tracker');

    route.params.subscribe(params => {
      this._id = params['id'];

      this.myHttp.getData('/' + this._id).subscribe(
        res => {
          this.tracker = res;
        } ,
        err => console.log(err)
      );
    });
  }

  onSubmit(form) {
    this.myHttp.putData('/' + this._id, form.value).subscribe(
      res => {
        this.toastr.success('Tracker saved successfully!');
        this.router.navigate(['dashboard']);
      } ,
      err => console.log(err)
    );
  }

  ngOnInit() {
  }

  removeTracker() {
    if(confirm("Are you sure to remove "+ this.tracker.title + "?")) {
      this.myHttp.deleteData('/' + this._id).subscribe(
        res => {
          this.toastr.success('Tracker deleted successfully!');
          this.router.navigate(['dashboard']);
        },
        err => console.log(err)
      );
    }
  }

}
