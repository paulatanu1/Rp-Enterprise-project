import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ManuBarComponent } from './shared/manu-bar/manu-bar.component';
import { TopContactBarComponent } from './shared/top-contact-bar/top-contact-bar.component';
import { SearchAreaComponent } from './shared/search-area/search-area.component';
import { BannerComponent } from './shared/banner/banner.component';
import { PopulerShapesComponent } from './shared/populer-shapes/populer-shapes.component';
import { NewProductComponent } from './shared/new-product/new-product.component';
import { OfferComponent } from './shared/offer/offer.component';
import { LatestBlogsComponent } from './shared/latest-blogs/latest-blogs.component';
import { AffiliationsComponent } from './shared/affiliations/affiliations.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    ClientComponent,
    TopContactBarComponent,
    SearchAreaComponent,
    ManuBarComponent,
    FooterComponent,
    OfferComponent,
    PopulerShapesComponent,
    NewProductComponent,
    LatestBlogsComponent,
    AffiliationsComponent,
    BannerComponent,
    FrontpageComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    LoginRegisterComponent,
    CartComponent,
    WishlistComponent,
  ],
  imports: [CommonModule, ClientRoutingModule, CarouselModule.forRoot()],
  exports: [
    TopContactBarComponent,
    SearchAreaComponent,
    ManuBarComponent,
    FooterComponent,
    OfferComponent,
    PopulerShapesComponent,
    NewProductComponent,
    LatestBlogsComponent,
    AffiliationsComponent,
    BannerComponent,
    FrontpageComponent,
  ],
})
export class ClientModule {}
