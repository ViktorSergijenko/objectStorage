import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { WarehousesListComponent } from './warehouses/warehouses-list/warehouses-list.component';
import { NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { AddWarehouseModalComponent } from './warehouses/add-warehouse-modal/add-warehouse-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EditWarehouseModalComponent } from './warehouses/edit-warehouse-modal/edit-warehouse-modal.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseInfoComponent } from './warehouses/warehouse-info/warehouse-info.component';
import { AddNewsModalComponent } from './warehouses/warehouse-info/add-news-modal/add-news-modal.component';
import { DetailsNewsModalComponent } from './warehouses/warehouse-info/details-news-modal/details-news-modal.component';
import { DeleteModalComponent } from './warehouses/delete-modal/delete-modal.component';




@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    WarehouseRoutingModule,
    NbToastrModule.forRoot()
  ],
  declarations:
    [
      DashboardComponent,
      WarehousesListComponent,
      AddWarehouseModalComponent,
      EditWarehouseModalComponent,
      WarehouseInfoComponent,
      AddNewsModalComponent,
      DetailsNewsModalComponent,
      DeleteModalComponent
    ],
  exports: [AddWarehouseModalComponent,
    EditWarehouseModalComponent,
    AddNewsModalComponent,
    DetailsNewsModalComponent,
    DeleteModalComponent
  ],
  entryComponents: [
    AddWarehouseModalComponent,
    EditWarehouseModalComponent,
    AddNewsModalComponent,
    DetailsNewsModalComponent,
    DeleteModalComponent
  ]
})

export class DashboardModule { }
