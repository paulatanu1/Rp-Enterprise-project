import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class PopularShapesService {
  constructor(private api: ApiService) {}

  popularShapes() {
    let url: string = 'api/popularShapes';

    return this.api.ApiCallWithLocalization('', url, 'post');
  }
}
