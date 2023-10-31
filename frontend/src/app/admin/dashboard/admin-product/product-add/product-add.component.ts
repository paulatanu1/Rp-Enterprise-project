import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  productAdd: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productAdd = this.formBuilder.group({
      status: ['1', Validators.required],
      lot_no: ['', Validators.required],
      stone_id: ['', Validators.required],
      location: ['', Validators.required],
      weight: ['', Validators.required],
      shape: ['', Validators.required],
      color: ['', Validators.required],
      clarity: ['', Validators.required],
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
      stone_type: ['', Validators.required],
      v360: ['', Validators.required],
      imgurl: ['', Validators.required],
      eye_clean: ['1', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.productAdd.valid) {
      const formData = this.productAdd.value;
      // Handle form submission or make an API request here
      console.log(formData);
    } else {
      // Form is invalid, handle validation errors
    }
  }
}
