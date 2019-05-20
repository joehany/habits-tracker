import { Component, OnInit } from '@angular/core';
import { HttptrackerService } from '../httptracker.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  showMsg: boolean = false;

  constructor(public myHttp: HttptrackerService) {

  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.myHttp.postData('', form.value).subscribe(
      res => {
        this.showMsg = true;
        form.reset();
        setTimeout(() => {
          this.showMsg = false;
        }, 3000);
      } ,
      err => console.log(err)
    );
  }

}
