import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../admin-services/product-list.service';
import { ToastrService } from 'ngx-toastr';
import { productItem } from '../../model/admin-model';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
