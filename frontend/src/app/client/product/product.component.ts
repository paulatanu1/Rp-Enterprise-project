import { Component, OnInit } from '@angular/core';
import { ClientProductService } from '../client-services/client-product.service';
import { IhomepageProduct } from '../client-model/client-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productList: IhomepageProduct[] = [];
  constructor(private product: ClientProductService) {}

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    this.product.getProductPageProducts().subscribe({
      next: (res) => {
        this.productList = res.response.raws.data.dataset;
      },
      error: (err) => {},
    });
  }
}
