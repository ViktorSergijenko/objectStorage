import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogTypeComponent } from './catalog-type.component';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AddCatalogTypeModalComponent } from './add-catalog-type-modal/add-catalog-type-modal.component';
import { EditCatalogTypeModalComponent } from './edit-catalog-type-modal/edit-catalog-type-modal.component';
import { CatalogTypeService } from '../../services/catalog-type.service';
import { CatalogType } from '../../models/catalog-type';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    RouterModule,
  ],
  declarations: [CatalogTypeComponent, AddCatalogTypeModalComponent, EditCatalogTypeModalComponent],
  entryComponents: [AddCatalogTypeModalComponent, EditCatalogTypeModalComponent],
  providers: [CatalogTypeService]
})
export class CatalogTypeModule { }
