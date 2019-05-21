import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tracker_record: any;
  mystate: any;
  user: any;

  constructor(public myHttp: HttptrackerService, public rout: ActivatedRoute,
    public toastr: ToastrService, public userService: UserService) {
    this.user = userService.getCurrentUser();
    this.mystate = 'daily';
    this.myHttp.getData('').subscribe(
      res => {
        this.tracker_record = res;
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
            const trackerIndex = this.tracker_record.findIndex(t => t.id == res.id);
            this.tracker_record[trackerIndex] = res;
            this.toastr.success('Checked successfully!');
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
