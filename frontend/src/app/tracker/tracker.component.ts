import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  mytitle: string;

  constructor() {
    this.mytitle = 'aaa';
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form.value);
  }

}
