import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  showMsg: boolean = false;
  tracker_record: any;
  _id: any;
  mystate: any;
  username: string;

  constructor(public myHttp: HttptrackerService, public route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Tracker Detail');

    this.mystate = 'daily';
    this.route.params.subscribe(params => {
      this._id = params['id'];

      this.myHttp.getData('/' + this._id).subscribe(
        res => {
          this.tracker_record = res;
          this.username = this.tracker_record.user;
          // console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    });
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
  onChange(deviceValue): void {
    this.mystate = deviceValue;
    console.log(deviceValue);
    this.myHttp.getData('/' + this._id).subscribe(
      res => {
        this.tracker_record = res;
      } ,
      err => console.log(err)
    );
  }

}
