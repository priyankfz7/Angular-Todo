import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  load: boolean = false;
  constructor(private userData: UserService, private router: Router) {}
  onSubmit(signup: NgForm) {
    const { firstname, lastname, email, password } = signup.form.value;
    this.load = true;
    this.userData
      .verifyEmail({ username: firstname + ' ' + lastname, email, password })
      .subscribe((data) => {
        this.load = false;
        localStorage.setItem('todo-user', JSON.stringify(data.data));
        this.router.navigate(['/otp']);
      });
  }
}
