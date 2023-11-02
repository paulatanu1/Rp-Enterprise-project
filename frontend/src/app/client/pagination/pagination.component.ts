import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number | undefined; // Total number of items from the API
  @Input() pageSize: number = 10;
  constructor() {}

  ngOnInit(): void {}

  // onPageChange(event: any): void {
  //   this.page = event.pageIndex + 1;
  //   this.pageSize = event.pageSize;
  //   // Fetch data from the API based on the new page (this.page) and pageSize (this.pageSize)
  //   // Update the totalItems value when data changes

  //   // Update the URL with the new query parameters
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: { page: this.page, pageSize: this.pageSize },
  //     queryParamsHandling: 'merge',
  //   });
}
