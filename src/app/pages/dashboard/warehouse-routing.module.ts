import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WarehouseInfoComponent } from './warehouses/warehouse-info/warehouse-info.component';
import { NgModule } from '@angular/core';
import { WarehousesListComponent } from './warehouses/warehouses-list/warehouses-list.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    { path: 'details/:id', component: WarehouseInfoComponent },
    { path: '', component: DashboardComponent },
    { path: 'list', component: WarehousesListComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class WarehouseRoutingModule {

}

export const routedComponents = [
  DashboardComponent,
  WarehouseInfoComponent,
];