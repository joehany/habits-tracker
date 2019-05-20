import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

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

  constructor(public myHttp: HttptrackerService, public route: ActivatedRoute, public router: Router) {
    route.params.subscribe(params => {
      this._id = params['id'];

      // fake id
      this._id = '5ce20ac2a3a1d755144d1dd5';

      this.myHttp.getData('/' + this._id).subscribe(
        res => {
          this.tracker = res;


          var datePipe = new DatePipe('en-US');
          this.startDateFormat = datePipe.transform(this.tracker.startDate, 'yyyy-MM-dd');
          console.log('orgin: ' + this.tracker.startDate);
          console.log('format: ' + this.startDateFormat);

        } ,
        err => console.log(err)
      );
    });
  }

  onSubmit(form) {
    this.myHttp.putData('/' + this._id, form.value).subscribe(
      res => {
        this.showMsg = true;
        this.message = 'Edit';
        form.reset();
        setTimeout(() => {
          this.showMsg = false;
          this.router.navigate(['dashboard']);
        }, 3000);
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
          this.message = 'Remove';
          this.showMsg = true;
          setTimeout(() => {
            this.showMsg = false;
            this.router.navigate(['dashboard']);
          }, 3000);
        },
        err => console.log(err)
      );
    }
  }

}
