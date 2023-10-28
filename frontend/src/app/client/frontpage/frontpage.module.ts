import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontpageRoutingModule } from './frontpage-routing.module';
import { FrontpageComponent } from './frontpage.component';
import { TopContactBarComponent } from '../shared/top-contact-bar/top-contact-bar.component';
import { SearchAreaComponent } from '../shared/search-area/search-area.component';
import { ManuBarComponent } from '../shared/manu-bar/manu-bar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { OfferComponent } from '../shared/offer/offer.component';
import { PopulerShapesComponent } from '../shared/populer-shapes/populer-shapes.component';
import { NewProductComponent } from '../shared/new-product/new-product.component';
import { LatestBlogsComponent } from '../shared/latest-blogs/latest-blogs.component';
import { AffiliationsComponent } from '../shared/affiliations/affiliations.component';
import { BannerComponent } from '../shared/banner/banner.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
@NgModule({
  declarations: [
    FrontpageComponent,
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
  ],
  imports: [CommonModule, FrontpageRoutingModule, CarouselModule.forRoot()],
})
export class FrontpageModule {}
