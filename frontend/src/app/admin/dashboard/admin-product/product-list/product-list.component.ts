import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/admin/admin-services/product-list.service';
import { ToastrService } from 'ngx-toastr';
import { productItem } from 'src/app/admin/model/admin-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productItems: productItem[] = [];
  constructor(
    private adminProduct: ProductListService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productList();
  }

  productList() {
    this.adminProduct.getProductList().subscribe({
      next: (res) => {
        console.log(res, 'resss');
        this.productItems = res.response.raws.data.dataset;
        console.log('productItems', this.productItems);
        this.toastr.success('Loading Successful', 'Yeah !', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }

  onScroll() {}
}
