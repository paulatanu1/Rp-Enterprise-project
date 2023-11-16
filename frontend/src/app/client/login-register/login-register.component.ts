import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../client-services/login-register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  constructor(
    private loginRegistrarion: LoginRegisterService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.loginRegistrarion.userLogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        let userName = res.user.name;
        ls.set('userName', userName);
        this.toastr.success(`Hello ${res.user.name}`, 'Login Successful!', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
        if (res.role === 1) {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: (err: any) => {
        this.toastr.error(`${err}`, 'OOOPS !', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      },
    });
    // this.http
    //   .post('http://localhost:8000/api/login', this.loginForm.value)
    //   .subscribe({
    //     next: (res) => {
    //     },
    //     error: (err) => {
    //     },
    //   });
  }
}
