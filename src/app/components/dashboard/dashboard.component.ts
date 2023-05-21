import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isAuth: boolean = false;
  tasks: any = [];
  addLoad: boolean = false;
  modalProps: any = {
    title: '',
    status: false,
    date: '',
    userId: '',
    _id: '',
  };
  constructor(private crudservices: CrudService, private router: Router) {}
  toggleStatus() {
    this.modalProps.status = !this.modalProps.status;
  }
  changeModalProps(data: any) {
    this.modalProps = { ...data };
  }
  onSubmit(form: NgForm) {
    this.addLoad = true;
    this.crudservices.addTask(form.form.value).subscribe((data) => {
      this.crudservices.getAlltasks().subscribe((data) => {
        this.addLoad = false;
        this.tasks = data;
        console.log(form.value);
        form.resetForm();
      });
    });
  }
  deleteTask(id: string) {
    this.crudservices.deleteTask(id).subscribe((data) => {
      this.crudservices.getAlltasks().subscribe((data) => {
        this.tasks = data;
      });
    });
  }
  onChange(value: any) {
    this.modalProps.title = value;
  }
  updateTask() {
    console.log(this.modalProps);
    this.crudservices
      .updateTask(this.modalProps._id, {
        title: this.modalProps.title,
        status: this.modalProps.status,
      })
      .subscribe((data) => {
        console.log(data);
        this.modalProps.title = '';

        this.crudservices.getAlltasks().subscribe((data) => {
          this.tasks = data;
        });
      });
  }
  ngOnInit(): void {
    let data: any = localStorage.getItem('angular-todo');

    if (data) {
      let token: any = JSON.parse(data)?.token;
      if (token) {
        this.crudservices
          .getAlltasks()
          .subscribe((data) => (this.tasks = data));
        this.isAuth = true;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
