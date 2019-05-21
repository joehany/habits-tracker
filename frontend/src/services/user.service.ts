import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable} from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  errorData = {};
  currentUser = "currentUser";
  redirectUrl = 'dashboard';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`,{email: email, password: password})
    .pipe(map(data => { 
      console.log(data);
      if(data && data['user'] && data['user']['token']){
        localStorage.setItem(this.currentUser,JSON.stringify(data['user']));
        console.log('====' + localStorage.getItem(this.currentUser))
      }
    }),
    catchError(this.handleError)
    )
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/signup`,{name: name, email: email, password: password})
    .pipe(map(data => { 
      debugger;
      console.log(data);
      if(data && data['user'] && data['user']['token']){
        localStorage.setItem(this.currentUser,JSON.stringify(data['user']));
        console.log('====' + localStorage.getItem(this.currentUser))
      }
    }),
    catchError(this.handleError)
    )
  }

  isLoggedIn(){
    if(localStorage.getItem(this.currentUser)){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    localStorage.removeItem(this.currentUser);
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred: ', error.error.message);
    }else{
      console.error(`Backend returned code ${error.status}, ` + `boday was: ${error.error}`);
    }

    this.errorData = {
      errorTitle: "Request failed",
      errorDesc: "Something bad happened. Please try again later."
    };

    return throwError(this.errorData);
  }
}
