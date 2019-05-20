import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showMsg: boolean = false;
  tracker_record: any;
  mystate: any;
  username: string;

  constructor(public myHttp: HttptrackerService, public rout: ActivatedRoute) {
    this.mystate = 'daily';
    this.myHttp.getData('').subscribe(
      res => {
        this.tracker_record = res;
        this.username = res[0].user;
        // console.log(res);
      },
      err => {
        console.log('error in constructor');
      }
    );
  }

  ngOnInit() {

  }

  onCheckin(id) {
    this.myHttp.postData('/' + id + '/checkin').subscribe(
          res => {
            this.showMsg = true;
            setTimeout(() => {
              this.showMsg = false;
            }, 3000);
          } ,
          err => console.log('error in onCheckin')
        );
    }

  // Must refresh data
  onChange(deviceValue): void {
    this.mystate = deviceValue;
    console.log(deviceValue);
    this.myHttp.getData('').subscribe(
      res => {
        this.tracker_record = res;
      } ,
      err => console.log(err)
    );
  }

}
