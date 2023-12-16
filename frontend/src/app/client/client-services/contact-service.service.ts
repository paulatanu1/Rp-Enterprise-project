import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactServiceService {
  constructor(private api: ApiService) {}

  sendMessage(data: {}) {
    let url: string = 'api/contact';

    return this.api.ApiCallWithLocalization(data, url, 'POST');
  }
}
