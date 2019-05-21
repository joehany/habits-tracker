import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  currentUser;

  constructor( public userService: UserService) {
    this.currentUser = userService.getCurrentUser();
  }

  ngOnInit() {

  }

}
