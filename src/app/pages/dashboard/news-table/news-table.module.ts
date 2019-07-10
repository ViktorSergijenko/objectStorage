import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsTableComponent } from './news-table.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InformationButtonComponent } from './information-button/information-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule
  ],
  declarations: [NewsTableComponent, InformationButtonComponent],
  exports: [InformationButtonComponent],
  entryComponents: [InformationButtonComponent]

})
export class NewsTableModule { }
