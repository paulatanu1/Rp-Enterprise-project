import { Component, OnInit } from '@angular/core';
import { ClientProductService } from '../client-services/client-product.service';
import { IhomepageProduct } from '../client-model/client-model';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productList: IhomepageProduct[] = [];
  clarityOptions: string[] = [];
  shapeOptions: string[] = [];
  clarityFilter: string = '';
  shapeFilter: string = '';
  searchByFilter: string = '';
  searchByOptions: string[] = [];
  searchControl = new FormControl();
  options: string[] = ['Option 1', 'select 2', 'check 3', 'check 4', 'opp 5'];
  filteredOptions: Observable<string[]>;
  constructor(private product: ClientProductService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    this.product.getHomePageProducts().subscribe({
      next: (res) => {
        this.productList = res.response.raws.data.dataset;
      },
      error: (err) => {},
    });
  }

  private _filter(value: string): string[] {
    if (value === null || value === undefined) {
      return []; // or any other appropriate default value
    }
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
