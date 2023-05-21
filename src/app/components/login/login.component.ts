import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  load: boolean = false;
  constructor(private userService: UserService, private router: Router) {}
  onSubmit(login: NgForm) {
    this.load = true;
    this.userService.login(login.form.value).subscribe({
      next: (data) => {
        console.log(data);
        this.load = false;
        localStorage.setItem('angular-todo', JSON.stringify(data));
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert(error.error.msg);
        this.load = false;
      },
    });
  }
  ngOnInit(): void {}
}
