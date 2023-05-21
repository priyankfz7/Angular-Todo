import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  url: string = 'https://angular-todo-api.onrender.com/tasks';
  constructor(private http: HttpClient) {}
  getAlltasks() {
    let data: any = localStorage.getItem('angular-todo');
    let token: any = JSON.parse(data).token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    return this.http.get(this.url, httpOptions);
  }
  addTask(task: any) {
    let data: any = localStorage.getItem('angular-todo');
    let token: any = JSON.parse(data).token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    return this.http.post(this.url + '/create', task, httpOptions);
  }
  deleteTask(_id: string) {
    let data: any = localStorage.getItem('angular-todo');
    let token: any = JSON.parse(data).token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    return this.http.delete(this.url + '/' + _id, httpOptions);
  }
  updateTask(id: string, updatedData: any) {
    let data: any = localStorage.getItem('angular-todo');
    let token: any = JSON.parse(data).token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    return this.http.patch(this.url + '/' + id, updatedData, httpOptions);
  }
}
