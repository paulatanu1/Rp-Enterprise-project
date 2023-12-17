import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';
import { IproductList } from '../client-model/client-model';

interface Payload {
  sort_by: string;
  order_by: string;
  page_number: number;
  no_of_records: number;
  search: string;
  search_by: string[];
  color: string;
  clarity: string;
  weight: string;
  shape: string;
  stone_type: string[];
}
@Injectable({
  providedIn: 'root',
})
export class ClientProductService {
  constructor(private api: ApiService) {}

  getHomePageProducts(
    PageNo: number,
    clarity: string,
    shape: string,
    searchBy: string[],
    search: string,
    no_of_records: number,
    sort_by: string,
    order_by: string,
    color: string,
    weight: string
  ) {
    // const payload: IproductList = {
    //   sort_by: '',
    //   order_by: '',
    //   page_number: '',
    //   no_of_records: 18,
    //   search: '',
    //   search_by: '',
    //   color: '',
    //   clarity: '',
    //   weight: '',
    //   shape: '',
    //   stone_type: [],
    // };

    const payload: Payload = {
      sort_by: sort_by,
      order_by: order_by,
      page_number: PageNo,
      no_of_records: no_of_records,
      search: search,
      search_by: searchBy,
      color: color,
      clarity: clarity,
      weight: weight,
      shape: shape,
      stone_type: [],
    };

    let url: string = 'api/productList';
    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }

  getProductPageProducts(data: IproductList) {
    const payload: IproductList = {
      sort_by: '',
      order_by: '',
      page_number: 1,
      no_of_records: 20,
      search: '',
      search_by: [],
      color: '',
      clarity: '',
      weight: '',
      shape: '',
      stone_type: [],
    };
    (payload.sort_by = data.sort_by),
      (payload.order_by = data.order_by || 'Asc'),
      (payload.page_number = data.page_number || 0),
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

  shapesList() {
    let url: string = 'api/shape';
    return this.api.ApiCallWithLocalization('', url, 'post');
  }

  clarityList() {
    let url: string = 'api/clarity';
    return this.api.ApiCallWithLocalization('', url, 'post');
  }
}
