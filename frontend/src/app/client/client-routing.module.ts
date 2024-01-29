import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsAndConditionComponent } from './shared/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { ReturnAndRefundComponent } from './shared/return-and-refund/return-and-refund.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./frontpage/frontpage.module').then((m) => m.FrontpageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./wishlist/wishlist.module').then((m) => m.WishlistModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'my-account',
    loadChildren: () =>
      import('./my-account/my-account.module').then((m) => m.MyAccountModule),
  },
  {
    path: 'login-register',
    loadChildren: () =>
      import('./login-register/login-register.module').then(
        (m) => m.LoginRegisterModule
      ),
  },
  {
    path: 'Terms-and-Conditions',
    component: TermsAndConditionComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'Return-and-Refund',
    component: ReturnAndRefundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
