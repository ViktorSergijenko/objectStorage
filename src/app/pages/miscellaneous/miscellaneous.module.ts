import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    NotFoundComponent
  ],
})
export class MiscellaneousModule { }
