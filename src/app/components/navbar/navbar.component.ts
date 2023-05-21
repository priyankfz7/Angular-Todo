import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuth: boolean = false;
  constructor() {}
  logout() {
    this.isAuth = false;
    localStorage.removeItem('angular-todo');
  }
}
