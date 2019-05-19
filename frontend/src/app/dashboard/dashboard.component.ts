import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public myHttp: HttptrackerService) {

  }

  ngOnInit() {

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
