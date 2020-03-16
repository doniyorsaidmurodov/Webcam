import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../authorization/authorization.component';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // host = 'http://192.168.43.229:8080/api/';
  host = 'http://127.0.0.1:8080/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + this.authService.getToken()
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  uploadImage(body): Observable<any> {
    return this.http.post<any>(this.host + 'upload_images/', body, this.httpOptions);
  }
  getFullData(identifier): Observable<any> {
    return this.http.post<any>(this.host + 'black_list/', {identifier}, this.httpOptions);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.host + 'auth/login/', user);
  }

  // login(user: User): Observable<any> {
  //   return this.http.post<any>(this.host + 'auth/login/', user);
  // }

}
