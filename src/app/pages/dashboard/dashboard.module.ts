import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { WarehousesListComponent } from './warehouses/warehouses-list/warehouses-list.component';
import { NbSpinnerModule } from '@nebular/theme';



@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbSpinnerModule
  ],
  declarations: [DashboardComponent, WarehousesListComponent]
})

export class DashboardModule { }
