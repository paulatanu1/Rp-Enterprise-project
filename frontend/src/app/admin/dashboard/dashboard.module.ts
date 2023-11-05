import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHeaderComponent } from '../shared/admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, FormsModule],
})
export class DashboardModule {}
