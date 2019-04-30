import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbSpinnerModule, NbToastrModule, NbInputModule, NbAlertModule, NbCardModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    NbInputModule,
    NbAlertModule,
    NbCardModule,
    NbToastrModule.forRoot(),
  ],
  declarations: [RegistrationComponent],
  providers: [AccountService]
})
export class RegistrationModule { }
