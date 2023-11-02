import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
// import { ProductComponent } from './ProductComponent';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProductRoutingModule, MatPaginatorModule],
})
export class ProductModule {}
