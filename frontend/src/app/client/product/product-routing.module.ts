import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
// import { ProductComponent } from './ProductComponent';

const routes: Routes = [
  { path: '', component: ProductComponent },
  // {path:'',component:}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
