import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { WarehousesListComponent } from './warehouses/warehouses-list/warehouses-list.component';
import { NbSpinnerModule, NbToastrModule, NbCalendarModule } from '@nebular/theme';
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
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { IncrementDecrementCatalogModalComponent } from './warehouses/warehouse-info/increment-decrement-catalog-modal/increment-decrement-catalog-modal.component';
import { EditCatalogModelComponent } from './warehouses/warehouse-info/edit-catalog-model/edit-catalog-model.component';
import { ProductTableComponent } from './warehouses/warehouse-info/product-table/product-table.component';
import { AddNewCatalogModalComponent } from './warehouses/warehouse-info/add-new-catalog-modal/add-new-catalog-modal.component';
import { EditCatalogModalComponent } from './warehouses/warehouse-info/edit-catalog-modal/edit-catalog-modal.component';
import { BasketModalComponent } from '../../@theme/components/header/basket-modal/basket-modal.component';
import { WarehouseListActionButtonsComponent } from './warehouses/warehouses-list/warehouse-list-action-buttons/warehouse-list-action-buttons.component';
import { ResolveProblemModalComponent } from './warehouses/warehouse-info/resolve-problem-modal/resolve-problem-modal.component';
import { NewsTableModule } from './news-table/news-table.module';
import { WarehouseLogTableComponent } from './warehouses/warehouse-info/warehouse-log-table/warehouse-log-table.component';




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
    NbToastrModule.forRoot(),
    Ng2SmartTableModule,
    NewsTableModule,
    NbCalendarModule
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
      DeleteModalComponent,
      IncrementDecrementCatalogModalComponent,
      EditCatalogModelComponent,
      ProductTableComponent,
      AddNewCatalogModalComponent,
      EditCatalogModalComponent,
      BasketModalComponent,
      WarehouseListActionButtonsComponent,
      ResolveProblemModalComponent,
      WarehouseLogTableComponent
    ],
  exports: [
    AddWarehouseModalComponent,
    EditWarehouseModalComponent,
    AddNewsModalComponent,
    DetailsNewsModalComponent,
    DeleteModalComponent,
    IncrementDecrementCatalogModalComponent,
    EditCatalogModelComponent,
    ProductTableComponent,
    AddNewCatalogModalComponent,
    EditCatalogModalComponent,
    BasketModalComponent,
    WarehouseListActionButtonsComponent,
    ResolveProblemModalComponent,
    WarehouseLogTableComponent
  ],
  entryComponents: [
    AddWarehouseModalComponent,
    EditWarehouseModalComponent,
    AddNewsModalComponent,
    DetailsNewsModalComponent,
    DeleteModalComponent,
    IncrementDecrementCatalogModalComponent,
    EditCatalogModelComponent,
    ProductTableComponent,
    AddNewCatalogModalComponent,
    EditCatalogModalComponent,
    BasketModalComponent,
    WarehouseListActionButtonsComponent,
    ResolveProblemModalComponent,
    WarehouseLogTableComponent
  ]
})

export class DashboardModule { }
