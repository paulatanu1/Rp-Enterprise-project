import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../client-services/login-register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  constructor(
    private loginRegistrarion: LoginRegisterService,
    private http: HttpClient
  ) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    // this.loginRegistrarion.userLogin(this.loginForm.value).subscribe({
    //   next: (res: any) => {
    //     console.log(res, 'ress');
    //   },
    //   error: (err: any) => {},
    // });
    this.http
      .post('http://localhost:8000/api/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          console.log(res, 'resss');
        },
        error: (err) => {
          console.log(err, 'errr');
        },
      });
  }
}
