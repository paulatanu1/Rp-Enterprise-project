import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';
import { IproductAdd } from '../admin-model/admin-model';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(private api: ApiService) {}

  shapesList() {
    let url: string = 'admin/shape';

    return this.api.ApiCallWithLocalization('', url, 'post');
  }

  stoneType() {
    let url: string = 'admin/stoneType';

    return this.api.ApiCallWithLocalization('', url, 'post');
  }

  clarity() {
    let url: string = 'admin/clarity';

    return this.api.ApiCallWithLocalization('', url, 'post');
  }

  color() {
    let url: string = 'admin/color';

    return this.api.ApiCallWithLocalization('', url, 'post');
  }

  productAdd(payload: IproductAdd) {
    let url: String = 'admin/productAdd';

    // const payload:IproductAdd = {};
    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }
}
