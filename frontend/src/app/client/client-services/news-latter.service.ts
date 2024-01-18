import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class NewsLatterService {
  constructor(private api: ApiService) {}

  newsLatter(email: string) {
    let url: string = 'api/newsLatter';
    var payload: { email_id: string } = { email_id: email };
    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }
}
