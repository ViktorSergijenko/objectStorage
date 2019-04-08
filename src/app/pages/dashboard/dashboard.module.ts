import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { WarehousesListComponent } from './warehouses/warehouses-list/warehouses-list.component';
import { NbSpinnerModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { AddWarehouseModalComponent } from './warehouses/add-warehouse-modal/add-warehouse-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EditWarehouseModalComponent } from './warehouses/edit-warehouse-modal/edit-warehouse-modal.component';




@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule
  ],
  declarations: [DashboardComponent, WarehousesListComponent, AddWarehouseModalComponent, EditWarehouseModalComponent],
  exports: [AddWarehouseModalComponent, EditWarehouseModalComponent],
  entryComponents: [AddWarehouseModalComponent, EditWarehouseModalComponent]
})

export class DashboardModule { }
