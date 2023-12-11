import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
// import { ProductComponent } from './ProductComponent';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SharedModule } from 'src/app/admin/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatPaginatorModule,
    SharedModule,
  ],
})
export class ProductModule {}
