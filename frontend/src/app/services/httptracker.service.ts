import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';

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
    this.servername = environment.apiUrl + '/trackers';
  }

  // General http get
  getData(par: string): Observable<any> {
    return this.http.get(this.servername + par, {headers: this.myheader});
  }

  // General http post
  postData(par: string, body?): Observable<any> {
    return this.http.post(this.servername + par, body, {headers: this.myheader});
  }

  // General http put
  putData(par: string, body): Observable<any> {
    return this.http.put(this.servername + par, body, {headers: this.myheader});
  }

  // General http delete
  deleteData(par: string): Observable<any> {
    return this.http.delete(this.servername + par, {headers: this.myheader});
  }
}
