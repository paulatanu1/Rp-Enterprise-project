import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class NewArrivalService {
  constructor(private api: ApiService) {}

  newArrival() {
    let url: string = 'api/newArrivel';

    return this.api.ApiCallWithLocalization('', url, 'post');
  }
}
