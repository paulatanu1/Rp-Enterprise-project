import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./frontpage/frontpage.module').then((m) => m.FrontpageModule),
  },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'my-account', loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule) },
  { path: 'login-register', loadChildren: () => import('./login-register/login-register.module').then(m => m.LoginRegisterModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
