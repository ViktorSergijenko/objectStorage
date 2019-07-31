import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CatalogNameTableComponent } from './catalog-name-table.component';
import { AddNewCatalogNameModalComponent } from './add-new-catalog-name-modal/add-new-catalog-name-modal.component';
import { EditCatalogNameModalComponent } from './edit-catalog-name-modal/edit-catalog-name-modal.component';
import { RouterModule } from '@angular/router';
import { WarehouseListWithCatalogNamesComponent } from './warehouse-list-with-catalog-names/warehouse-list-with-catalog-names.component';
import { NbListModule } from '@nebular/theme';
import { CatalogNameActionButtonsComponent } from './catalog-name-action-buttons/catalog-name-action-buttons.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    RouterModule,
    NbListModule
  ],
  declarations: [
    CatalogNameTableComponent,
    AddNewCatalogNameModalComponent,
    EditCatalogNameModalComponent,
    WarehouseListWithCatalogNamesComponent,
    CatalogNameActionButtonsComponent
  ],
  entryComponents: [
    AddNewCatalogNameModalComponent,
    EditCatalogNameModalComponent,
    WarehouseListWithCatalogNamesComponent,
    CatalogNameActionButtonsComponent
  ]
})
export class CatalogNameTableModule { }
