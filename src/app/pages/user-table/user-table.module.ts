import { NgModule } from '@angular/core';
import { UserTableComponent } from './user-table.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableActionButtonsComponent } from './table-action-buttons/table-action-buttons.component';
import { EditPasswordModalComponent } from './edit-password-modal/edit-password-modal.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditUserInformationModalComponent } from './edit-user-information-modal/edit-user-information-modal.component';
import { NbCheckboxModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NbCheckboxModule
  ],
  declarations: [UserTableComponent, TableActionButtonsComponent, EditPasswordModalComponent, EditUserInformationModalComponent],
  entryComponents: [TableActionButtonsComponent, EditPasswordModalComponent, EditUserInformationModalComponent]
})
export class UserTableModule { }
