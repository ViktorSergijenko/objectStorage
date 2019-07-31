import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserTableComponent } from './user-table/user-table.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CatalogNameTableComponent } from './catalog-name-table/catalog-name-table.component';
import { LogTableComponent } from './log-table/log-table.component';
import { CatalogTypeComponent } from './catalog-type/catalog-type.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: PagesComponent,
  children: [{
    path: 'warehouse',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: '400',
    component: NotFoundComponent,
  },
  {
    path: 'user-table',
    component: UserTableComponent,
  },
  {
    path: 'catalog-name-list/:id',
    component: CatalogNameTableComponent,
  },
  {
    path: 'catalog-type-list',
    component: CatalogTypeComponent,
  },
  {
    path: 'log-table',
    component: LogTableComponent,
  },
  {
    path: '',
    redirectTo: 'warehouse/list',
    pathMatch: 'full',
  }, {
    path: 'warehouse',
    component: DashboardComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
