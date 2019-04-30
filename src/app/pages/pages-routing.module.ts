import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: PagesComponent,
  children: [{
    path: 'warehouse',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  },
  {
    path: 'register',
    component: RegistrationComponent,
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
