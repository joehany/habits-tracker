import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
  currentUser: any;
  constructor(private userService: UserService, private toastr: ToastrService ){}
  logout() {
    this.userService.logout();
    this.toastr.success('Logged out successfully!');
    window.location.reload();
  }
}
