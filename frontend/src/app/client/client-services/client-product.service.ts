import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';
import { IproductList } from '../client-model/client-model';

@Injectable({
  providedIn: 'root',
})
export class ClientProductService {
  constructor(private api: ApiService) {}

  getHomePageProducts() {
    const payload: IproductList = {
      sort_by: '',
      order_by: '',
      page_number: '',
      no_of_records: 8,
      search: '',
      search_by: '',
      color: '',
      clarity: '',
      weight: '',
      shape: '',
      stone_type: [],
    };
    (payload.sort_by = ''),
      (payload.order_by = 'asc'),
      (payload.page_number = '1'),
      (payload.no_of_records = 8),
      (payload.search = ''),
      (payload.search_by = ''),
      (payload.color = ''),
      (payload.clarity = ''),
      (payload.weight = ''),
      (payload.shape = ''),
      (payload.stone_type = []);

    let url: string = '/api/productList';
    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }

  getProductPageProducts(data: IproductList) {
    const payload: IproductList = {
      sort_by: '',
      order_by: '',
      page_number: '',
      no_of_records: 20,
      search: '',
      search_by: '',
      color: '',
      clarity: '',
      weight: '',
      shape: '',
      stone_type: [],
    };
    (payload.sort_by = data.sort_by),
      (payload.order_by = data.order_by || 'Asc'),
      (payload.page_number = data.page_number || '1'),
      (payload.no_of_records = data.no_of_records || 20),
      (payload.search = data.search),
      (payload.search_by = data.search_by),
      (payload.color = data.color),
      (payload.clarity = data.clarity),
      (payload.weight = data.weight),
      (payload.shape = data.shape),
      (payload.stone_type = []);

    let url: string = '/api/productList';
    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }
}
