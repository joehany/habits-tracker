import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  showMsg: boolean = false;
  _id: any;

  constructor(public myHttp: HttptrackerService, public route: ActivatedRoute) {
    route.params.subscribe(params => {
      this._id = params['id'];

      // fake id
      this._id = '5ce20ac2a3a1d755144d1dd5';
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

}
