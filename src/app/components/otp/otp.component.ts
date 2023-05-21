import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  userdata: any;
  otpValue: string = '';
  load: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  onChange(val: any) {
    this.otpValue = val;
  }
  register() {
    const { username, email, password } = this.userdata;
    if (this.otpValue == this.userdata.otp) {
      this.load = true;
      this.userService.register({ username, email, password }).subscribe({
        next: (data) => {
          this.load = false;
          console.log(data);
          alert(data.msg);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.load = false;
          alert(error.error.msg);
        },
      });
    } else {
      alert('Invalid OTP');
    }
  }
  ngOnInit(): void {
    let data: any = localStorage.getItem('todo-user');
    this.userdata = JSON.parse(data);
  }
}
