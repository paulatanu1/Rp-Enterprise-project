import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [SharedComponent, AdminHeaderComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [AdminHeaderComponent],
})
export class SharedModule {}
