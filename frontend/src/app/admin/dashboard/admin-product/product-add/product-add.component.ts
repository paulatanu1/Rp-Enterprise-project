import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddProductService } from 'src/app/admin/admin-services/add-product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  productAdd: FormGroup;
  productStatus: { id: string; name: string }[] = [
    { id: '1', name: 'Available' },
    { id: '0', name: 'Not Available' },
  ];
  shapesItem: {
    shape: string;
  }[] = [];

  stoneType: { stone_type: string }[] = [];
  clarity: { clarity: string }[] = [];
  color: { color: string }[] = [];
  eyeClean: { id: string; name: string }[] = [
    { id: '1', name: 'Yes' },
    { id: '0', name: 'No' },
  ];
  isSubmited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private addProduct: AddProductService,
    private toastr: ToastrService
  ) {
    this.productAdd = this.formBuilder.group({
      status: ['1', Validators.required],
      lot_no: ['', Validators.required],
      stone_id: ['', Validators.required],
      location: ['', Validators.required],
      weight: ['', Validators.required],
      shape: ['', Validators.required],
      color: [this.color[0], Validators.required],
      clarity: [this.clarity[0], Validators.required],
      cut: ['', Validators.required],
      polish: ['', Validators.required],
      symmetry: ['', Validators.required],
      rapnet_price: ['', Validators.required],
      system_discount: ['', Validators.required],
      lab: ['', Validators.required],
      certificate: ['', Validators.required],
      certi_pdf_url: ['', Validators.required],
      ratio: ['', Validators.required],
      measurements: ['', Validators.required],
      fluor_int: ['', Validators.required],
      table: ['', Validators.required],
      depth: ['', Validators.required],
      crown_ht: ['', Validators.required],
      crown_angle: ['', Validators.required],
      pavilion_dep: ['', Validators.required],
      pavilion_an: ['', Validators.required],
      stone_type: [this.stoneType[1], Validators.required],
      v360: ['', Validators.required],
      imgurl: ['', Validators.required],
      eye_clean: ['1', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getShapes();
    this.getStoneType();
    this.getClarity();
    this.getColor();
  }

  onSubmit() {
    console.log(this.productAdd.value);
    if (this.productAdd.valid) {
      const formData = this.productAdd.value;
      // Handle form submission or make an API request here
      console.log(formData);
      this.addProduct.productAdd(formData).subscribe({
        next: (res) => {
          this.isSubmited = true;
          this.toastr.success(`${res.response.raws.success_message}`, '', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
          this.productAdd.reset();
        },
      });
    } else {
      // Form is invalid, handle validation errors
    }
  }

  updateStatus(event: any) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.productAdd.get('status')?.setValue(selectedId);
  }

  updateEyeClean(event: any) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.productAdd.get('eye_clean')?.setValue(selectedId);
  }

  getShapes() {
    this.addProduct.shapesList().subscribe({
      next: (res) => {
        console.log('getShapes', res);
        this.shapesItem = res.response.raws.data.dataset;

        this.productAdd.patchValue({
          shape: this.shapesItem[0].shape,
        });
      },
      error: (err) => {},
    });
  }

  getStoneType() {
    this.addProduct.stoneType().subscribe({
      next: (res) => {
        console.log('getStoneType', res);
        this.stoneType = res.response.raws.data.dataset;
        this.productAdd.patchValue({
          stone_type: this.stoneType[1].stone_type,
        });
      },
      error: (err) => {},
    });
  }

  getClarity() {
    this.addProduct.clarity().subscribe({
      next: (res) => {
        console.log('getClarity', res);
        this.clarity = res.response.raws.data.dataset;
        this.productAdd.patchValue({
          clarity: this.clarity[0].clarity,
        });
      },
      error: (err) => {},
    });
  }

  getColor() {
    this.addProduct.color().subscribe({
      next: (res) => {
        console.log('getColor', res);
        this.color = res.response.raws.data.dataset;
        this.productAdd.patchValue({
          color: this.color[0].color,
        });
      },
      error: (err) => {},
    });
  }
}
