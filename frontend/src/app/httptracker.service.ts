import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// https://alligator.io/js/introduction-localstorage-sessionstorage/   ---> link for localstorage
export class HttptrackerService {
  servername: string;
  token: string;
  myheader: any;

  constructor(public http: HttpClient) {
    this.servername = 'https://randomuser.me/api';

    this.token = localStorage.getItem('token');

    this.myheader = new Headers();
    this.myheader.append('Content-Type', 'applicatoin/json');
    //this.myheader.append('Authorizatoin', this.token);
  }

  // General http get
  getData(par: string) {
    return this.http.get(this.servername + par, this.myheader);
  }

  // General http post
  postData(par: string, body?, header?) {
    return this.http.post(this.servername + par, body, header);
  }

   // Get dashboard data
   getDashboard() {
    return this.http.get(this.servername);
  }
}
