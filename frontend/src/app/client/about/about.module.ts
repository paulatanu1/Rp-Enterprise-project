import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { TopContactBarComponent } from '../shared/top-contact-bar/top-contact-bar.component';
import { SearchAreaComponent } from '../shared/search-area/search-area.component';
import { ManuBarComponent } from '../shared/manu-bar/manu-bar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
