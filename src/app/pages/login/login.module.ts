import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbSpinnerModule, NbInputModule, NbAlertModule, NbCardModule, NbToastrModule } from '@nebular/theme';
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
  declarations: [LoginComponent],
  providers: [AccountService]
})
export class LoginModule { }
