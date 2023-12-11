import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private api: ApiService) {}

  getProductDetails(id: string) {
    let url: string = 'api/productView';
    const payload: { product_id: string } = { product_id: id };
    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }
}
