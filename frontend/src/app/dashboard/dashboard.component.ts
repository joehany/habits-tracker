import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showMsg: boolean = false;
  _id: any;

  constructor(public myHttp: HttptrackerService, public rout: ActivatedRoute) {
    this.rout.params.subscribe(params => {
        this._id = params['id'];

        // fake id
        this._id = '5ce20ac2a3a1d755144d1dd5';
      }
    );
  }

  ngOnInit() {

  }

  onCheckin() {
    this.myHttp.postData('/' + this._id + '/checkin').subscribe(
          res => {
            this.showMsg = true;
            setTimeout(() => {
              this.showMsg = false;
            }, 3000);
          } ,
          err => console.log(err)
        );
    }

  // Must refresh data
  onChange(deviceValue) {
    this.myHttp.getData('').subscribe(
      res => {
        console.log(res);
        //console.log(JSON.parse(res));
      } ,
      err => console.log(err)
    );
  }

}
