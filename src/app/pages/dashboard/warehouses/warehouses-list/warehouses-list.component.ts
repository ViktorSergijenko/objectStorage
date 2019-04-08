import { Component, OnInit } from '@angular/core';
import { WarehousesService } from '../warehouses.service';
import { Warehouse } from '../../../../models/warehouse.model';

@Component({
  selector: 'ngx-warehouses-list',
  templateUrl: './warehouses-list.component.html',
  styleUrls: ['./warehouses-list.component.scss']
})
export class WarehousesListComponent implements OnInit {

  /**
   * Variable that stores path to an image that will be displayed
   *
   * @type {string}
   * @memberof WarehousesListComponent
   */
  imageSourcePath: string;
  warehouseList: Warehouse[] = [];

  constructor(
    private warehouseService: WarehousesService
  ) { }

  ngOnInit() {
    this.warehouseService.getAllWarehouses().subscribe((warehouses: Warehouse[]) => {
      this.warehouseList = warehouses;
    })
    this.getRandomImageForWarehouse();
  }

  getRandomImageForWarehouse() {

    const randomNumber = Math.floor(Math.random() * 6);
    console.log(randomNumber);
    this.imageSourcePath = `./assets/images/warehouse${randomNumber}.jpg`;
  }

}
