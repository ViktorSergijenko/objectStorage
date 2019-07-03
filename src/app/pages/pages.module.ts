import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { RegistrationModule } from './registration/registration.module';
import { UserTableModule } from './user-table/user-table.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CatalogNameTableModule } from './catalog-name-table/catalog-name-table.module';
import { LogTableModule } from './log-table/log-table.module';
import { NewsTableModule } from './dashboard/news-table/news-table.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    RegistrationModule,
    CatalogNameTableModule,
    UserTableModule,
    MiscellaneousModule,
    LogTableModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
