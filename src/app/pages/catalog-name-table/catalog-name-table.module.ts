import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CatalogNameTableComponent } from './catalog-name-table.component';
import { AddNewCatalogNameModalComponent } from './add-new-catalog-name-modal/add-new-catalog-name-modal.component';
import { EditCatalogNameModalComponent } from './edit-catalog-name-modal/edit-catalog-name-modal.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    CatalogNameTableComponent,
    AddNewCatalogNameModalComponent,
    EditCatalogNameModalComponent
  ],
  entryComponents: [AddNewCatalogNameModalComponent, EditCatalogNameModalComponent]
})
export class CatalogNameTableModule { }
