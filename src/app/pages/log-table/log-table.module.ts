import { NgModule } from '@angular/core';
import { LogTableComponent } from './log-table.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [LogTableComponent]
})
export class LogTableModule { }
