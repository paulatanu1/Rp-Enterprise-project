import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../client-services/product-details.service';
import { ActivatedRoute } from '@angular/router';
interface IproductDetails {
  id: number;
  status: number;
  lot_no: string;
  stone_id: string;
  location: string;
  weight: string;
  shape: string;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  rapnet_price: string;
  system_discount: string;
  lab: string;
  certificate: string;
  certi_pdf_url: string;
  ratio: string;
  measurements: string;
  fluor_int: string;
  table: string;
  depth: string;
  crown_ht: string;
  crown_angle: string;
  pavilion_dep: string;
  pavilion_an: string;
  stone_type: string;
  v360: string;
  imgurl: string;
  eye_clean: number;
  system_price: string;
  system_amount: string;
  product_name: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  productDetails: IproductDetails = {
    id: 0,
    status: 0,
    lot_no: '',
    stone_id: '',
    location: '',
    weight: '',
    shape: '',
    color: '',
    clarity: '',
    cut: '',
    polish: '',
    symmetry: '',
    rapnet_price: '',
    system_discount: '',
    lab: '',
    certificate: '',
    certi_pdf_url: '',
    ratio: '',
    measurements: '',
    fluor_int: '',
    table: '',
    depth: '',
    crown_ht: '',
    crown_angle: '',
    pavilion_dep: '',
    pavilion_an: '',
    stone_type: '',
    v360: '',
    imgurl: '',
    eye_clean: 0,
    system_price: '',
    system_amount: '',
    product_name: '',
  };
  constructor(
    private _porductService: ProductDetailsService,
    private _router: ActivatedRoute
  ) {
    this._router.params.subscribe({
      next: (res) => {
        this.productId = res['id'];
        console.log(this.productId, typeof this.productId);
      },
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._porductService.getProductDetails(this.productId).subscribe({
      next: (res) => {
        console.log(res, 'ress');
        this.productDetails = res.response.raws.data.dataset;
      },
      error: (err) => {
        console.log(err, 'errr');
      },
    });
  }
}
