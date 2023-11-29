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
      status: ['1'],
      lot_no: [''],
      stone_id: [''],
      location: [''],
      weight: [''],
      shape: [''],
      color: [this.color[0]],
      clarity: [this.clarity[0]],
      cut: [''],
      polish: [''],
      symmetry: [''],
      rapnet_price: [''],
      system_discount: [''],
      lab: [''],
      certificate: [''],
      certi_pdf_url: [''],
      ratio: [''],
      measurements: [''],
      fluor_int: [''],
      table: [''],
      depth: [''],
      crown_ht: [''],
      crown_angle: [''],
      pavilion_dep: [''],
      pavilion_an: [''],
      stone_type: [this.stoneType[1]],
      v360: [''],
      imgurl: [''],
      eye_clean: ['1'],
    });
  }

  ngOnInit(): void {
    this.getShapes();
    this.getStoneType();
    this.getClarity();
    this.getColor();
  }

  onSubmit() {
    if (this.productAdd.valid) {
      const formData = this.productAdd.value;
      // Handle form submission or make an API request here
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
        this.color = res.response.raws.data.dataset;
        this.productAdd.patchValue({
          color: this.color[0].color,
        });
      },
      error: (err) => {},
    });
  }
}
