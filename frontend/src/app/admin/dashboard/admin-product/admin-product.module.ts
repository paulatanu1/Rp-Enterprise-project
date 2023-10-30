import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductRoutingModule } from './admin-product-routing.module';
import { AdminProductComponent } from './admin-product.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [AdminProductComponent, ProductAddComponent, ProductListComponent],
  imports: [CommonModule, AdminProductRoutingModule, SharedModule],
})
export class AdminProductModule {}
