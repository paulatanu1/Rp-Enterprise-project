import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
// import { ProductComponent } from './ProductComponent';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [],
  },
  { path: 'details/:id', component: ProductDetailsComponent },
  // {path:'',component:}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
