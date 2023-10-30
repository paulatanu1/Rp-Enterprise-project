import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  constructor(private api: ApiService) {}

  getProductList() {
    let url: string = 'admin/productList';
    const payload: any = new Object();
    (payload.sort_by = ''),
      (payload.order_by = 'asc'),
      (payload.page_number = '1'),
      (payload.no_of_records = 20),
      (payload.search = ''),
      (payload.search_by = ''),
      (payload.color = ''),
      (payload.clarity = ''),
      (payload.weight = ''),
      (payload.shape = ''),
      (payload.stone_type = []);

    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }
}
