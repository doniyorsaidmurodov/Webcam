import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../authorization/authorization.component';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  host = 'http://192.168.43.229:8080/api/';
  // host = 'http://127.0.0.1:8080/api/';
  token = null;
  tokenCookie = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.token = localStorage.getItem('token');
    this.tokenCookie = this.cookieService.get('token');
  }



  setToken(token: string, rememberMe: boolean = false): void {
    if (rememberMe === true) {
      this.cookieService.set('token', token, new Date(new Date().getTime() + 7 * 24 * 60 * 60000));
    }
    localStorage.setItem('token', token);
  }

  getToken(): string {
    if (this.token === null) {
      this.token = localStorage.getItem('token') || null;
    }
    return this.token;
  }

  getTokenFromCookie(): string {
    if (this.tokenCookie === null) {
      this.tokenCookie = this.cookieService.get('token');
    }
    return this.tokenCookie;
  }

  logOut(reload: boolean = false): void {
    if (reload) {
      window.location.reload();
    }
    this.cookieService.delete('token', '/');
    localStorage.removeItem('token');
    this.token = null;
    this.tokenCookie = null;
  }

}


