import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// https://alligator.io/js/introduction-localstorage-sessionstorage/   ---> link for localstorage
export class HttptrackerService {
  servername: string;
  currentuser: any;
  token: string;
  myheader: any;

  constructor(public http: HttpClient) {
    this.servername = 'http://localhost:3000/trackers';

    // this.currentuser = {
    //   _id: '5ce1e6a8a3a1d755144d1dd3',
    //   email: 'seung.sovann@gmail.com',
    //   name: 'Sovann',
    //   createdAt: '2019-05-19T23:28:40.439Z',
    //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNldW5nLnNvdmFubkBnbWFpbC5jb20iLCJpZCI6IjVjZTFlNmE4YTNhMWQ3NTUxNDRkMWRkMyIsImV4cCI6MTU2NjA4NDUyMCwiaWF0IjoxNTU4MzA4NTIwfQ.KxzRNLzyo6jp6ldts9CEriKpA34oyBTj5YhB3zwFKiI'
    // }
    // localStorage.setItem('currentuser', JSON.stringify(this.currentuser));

    this.token = JSON.parse(localStorage.getItem('currentuser')).token;

    // this.myheader = new Headers();
    // this.myheader.append('Content-Type', 'application/json');
    // this.myheader.append('Authorization', 'Token ' + this.token);

    this.myheader = new HttpHeaders().set('Authorization', 'Token ' + this.token);
  }

  // General http get
  getData(par: string) {
    return this.http.get(this.servername + par, {headers: this.myheader});
  }

  // General http post
  postData(par: string, body?) {
    return this.http.post(this.servername + par, body, {headers: this.myheader});
  }

  // General http put
  putData(par: string, body) {
    return this.http.put(this.servername + par, body, {headers: this.myheader});
  }

  // General http delete
  deleteData(par: string) {
    return this.http.delete(this.servername + par, {headers: this.myheader});
  }
}
