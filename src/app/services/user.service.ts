import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface Data {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'https://angular-todo-api.onrender.com/users';
  constructor(private http: HttpClient) {}
  verifyEmail(data: Data): Observable<any> {
    return this.http.post<any>(this.url + '/verifyemail', data);
  }
  register(data: Data) {
    return this.http.post<any>(this.url + '/register', data);
  }
  login(data: { email: string; password: string }) {
    return this.http.post<any>(this.url + '/login', data);
  }
}
