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
import { MyAccountComponent } from './my-account/my-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductComponent } from './product/product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CarouselModule as OwlCarouselModule } from 'ngx-owl-carousel-o';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { ProductDetailsComponent } from './product-details/product-details.component';

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
    ProductComponent,
    MyAccountComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    OwlCarouselModule,
    InfiniteScrollModule,
  ],
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
  providers: [HighContrastModeDetector],
})
export class ClientModule {}
