import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  constructor(private api: ApiService) {}

  userLogin(values: { email: string; password: string }) {
    let url: string = 'api/login';
    const formData: any = new Object();
    formData.email = values.email;
    formData.password = values.password;
    // formData.append('email', values.email);
    // formData.append('password', values.password);
    return this.api.ApiCallWithLocalization(formData, url, 'post');
  }
}
