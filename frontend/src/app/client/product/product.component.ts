import { Component, OnInit } from '@angular/core';
import { ClientProductService } from '../client-services/client-product.service';
import { IhomepageProduct } from '../client-model/client-model';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productList: IhomepageProduct[] = [];
  clarityOptions: { clarity: string }[] = [];
  shapeOptions: { shape: string }[] = [];
  clarityFilter: string = '';
  shapeFilter: string = '';
  searchByFilter: string = '';
  searchByOptions: string[] = [];
  searchControl = new FormControl();
  options: string[] = ['Option 1', 'select 2', 'check 3', 'check 4', 'opp 5'];
  filteredOptions: Observable<string[]>;
  totalItems!: number;
  PageNo = 1;
  clarity: string = '';
  shape: string = '';
  searchBy: string[] = [];
  search: string = '';
  displayedItems: number = 0;
  no_of_reecord = 18;
  sort_by: string = '';
  order_by: string = 'Asc';
  color: string = '';
  SearchproductName: string[] = [];
  searchQuery: string = '';
  weight: string = '';
  selectedSortingValue: string = 'Asc';
  constructor(private product: ClientProductService, private router: Router) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.searchByOptions = ['clarity', 'shape', 'weight'];

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.getProductData(
      this.PageNo,
      this.clarity,
      this.shape,
      this.searchBy,
      this.search,
      this.no_of_reecord,
      this.sort_by,
      this.order_by,
      this.color,
      this.weight
    );
    this.getShapesList();
    this.getClarityList();
  }

  getProductData(
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
    this.product
      .getHomePageProducts(
        PageNo,
        clarity,
        shape,
        searchBy,
        search,
        no_of_records,
        sort_by,
        order_by,
        color,
        weight
      )
      .subscribe({
        next: (res) => {
          this.totalItems = res.response.raws.data.total_count;
          this.productList.push(...res.response.raws.data.dataset);
          this.displayedItems++;
          this.SearchproductName = res.response.raws.data.dataset;
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

  onScroll() {
    // debugger;
    console.log('rrr', this.totalItems > this.productList.length);
    if (this.totalItems > this.productList.length) {
      this.PageNo = this.PageNo + 1;
      this.getProductData(
        this.PageNo,
        this.clarity,
        this.shape,
        this.searchBy,
        this.search,
        this.no_of_reecord,
        this.sort_by,
        this.order_by,
        this.color,
        this.weight
      );
    }
  }

  shareProductOnWhatsApp(item: IhomepageProduct) {
    const message = encodeURIComponent(
      `I want to buy Product:- Clarity: ${item.clarity},weight: ${item.weight},Stone Id: ${item.stone_id},Cut: ${item.cut},Shape: ${item.shape}`
    );
    const whatsappURL = `https://api.whatsapp.com/send?phone=${environment.WHATSAPP_NUMBER}&text= ${message}`;
    console.log(whatsappURL);
    // window.location.href = whatsappURL;

    window.open(whatsappURL, '_blank');

    // <a href="https://api.whatsapp.com/send?phone=1XXXXXXXXXX&text=I want to buy Product X. Price: $19.99">Buy Now</a>
  }

  performSearch() {
    const trimmedQuery = this.searchQuery.trim();
    console.log(trimmedQuery, 'search');
    console.log(this.shape, 'shape');

    if (trimmedQuery) {
      this.search = trimmedQuery;
      this.productList = [];
      this.PageNo = 1;
      this.getProductData(
        this.PageNo,
        this.clarity,
        this.shape,
        this.searchBy,
        this.search,
        this.no_of_reecord,
        this.sort_by,
        this.order_by,
        this.color,
        this.weight
      );
    } else {
      this.productList = [];
      this.PageNo = 1;
      this.getProductData(
        this.PageNo,
        this.clarity,
        this.shape,
        this.searchBy,
        this.search,
        this.no_of_reecord,
        this.sort_by,
        this.order_by,
        this.color,
        this.weight
      );
    }
  }

  // Initialize variables to store selected values

  onShapeFilterChange() {
    if (this.shapeFilter === 'All') {
      this.shape = '';
    } else {
      this.shape = this.shapeFilter;
    }
  }

  onClarityFilterChange() {
    if (this.clarityFilter === 'All') {
      this.clarity = '';
    } else {
      this.clarity = this.clarityFilter;
    }
  }

  onSortingFilterChange(ev: Event) {
    console.log(ev.target, 'ev');
    console.log(this.selectedSortingValue, 'selectedSortingValue');
  }
  resetFilter() {
    (this.PageNo = 1),
      (this.clarity = ''),
      (this.shape = ''),
      (this.searchBy = []),
      (this.search = ''),
      (this.no_of_reecord = 18),
      (this.sort_by = ''),
      (this.order_by = 'Asc'),
      (this.color = ''),
      (this.weight = '');
    this.getProductData(
      this.PageNo,
      this.clarity,
      this.shape,
      this.searchBy,
      this.search,
      this.no_of_reecord,
      this.sort_by,
      this.order_by,
      this.color,
      this.weight
    );
  }

  getShapesList() {
    this.product.shapesList().subscribe({
      next: (res) => {
        console.log(res.response.raws.data.dataset, 'rss shapes');
        this.shapeOptions = res.response.raws.data.dataset;
        console.log(this.shapeOptions, 'list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getClarityList() {
    this.product.clarityList().subscribe({
      next: (res) => {
        console.log(res.response.raws.data.dataset, 'rss shapes');
        this.clarityOptions = res.response.raws.data.dataset;
        console.log(this.shapeOptions, 'list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
