import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = '';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string)   {
    return this.http.post<any>(this.host + 'smth', {username, password});
  }

}
