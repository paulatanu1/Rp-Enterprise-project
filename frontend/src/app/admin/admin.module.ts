import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [],
})
export class AdminModule {}
