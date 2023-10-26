import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontpageRoutingModule } from './frontpage-routing.module';
import { FrontpageComponent } from './frontpage.component';
import { TopContactBarComponent } from '../shared/top-contact-bar/top-contact-bar.component';
import { SearchAreaComponent } from '../shared/search-area/search-area.component';
import { ManuBarComponent } from '../shared/manu-bar/manu-bar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [
    FrontpageComponent,
    TopContactBarComponent,
    SearchAreaComponent,
    ManuBarComponent,
    FooterComponent,
  ],
  imports: [CommonModule, FrontpageRoutingModule],
})
export class FrontpageModule {}
