import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../../../models/warehouse.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { CatalogService } from '../../../services/catalog.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-warehouse-list-with-catalog-names',
  templateUrl: './warehouse-list-with-catalog-names.component.html',
  styleUrls: ['./warehouse-list-with-catalog-names.component.scss']
})
export class WarehouseListWithCatalogNamesComponent implements OnInit {

  /**
   * Method that will store all warehouses that includes catalogs with specific name
   *
   * @type {Warehouse}
   * @memberof WarehouseListWithCatalogNamesComponent
   */
  warehouses: Warehouse[] = [];
  loadingIndicator: boolean = true;
  /**
   * Catalog name Id that we want to fint in warehouses
   *
   * @type {string}
   * @memberof WarehouseListWithCatalogNamesComponent
   */
  catalogNameId: string;
  constructor(
    private modal: NgbActiveModal,
    private toastrService: NbToastrService,
    private catalogService: CatalogService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Getting needed warehouses
    this.getWarehouses();
  }

  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof WarehouseListWithCatalogNamesComponent
   */
  close() {
    this.modal.dismiss();
  }

  /**
   * Method navigates to warehouse detailed information page
   *
   * @private
   * @param {string} warehouseId Id of an warehouse that we want to anvigate to
   * @memberof WarehouseListWithCatalogNamesComponent
   */
  private navigateToWarehouse(warehouseId: string) {
    this.router.navigate([`pages/warehouse/details/${warehouseId}`]);
    this.close();
  }


  /**
   * Method gets warehouses that has catalogs with specific name
   *
   * @private
   * @memberof WarehouseListWithCatalogNamesComponent
   */
  private getWarehouses() {
    this.catalogService.getWarehousesThatHaveCatalogsWithSpecificName(this.catalogNameId)
      .pipe(
        finalize(() => {
          this.loadingIndicator = false;
        })
      )
      .subscribe(warehouseList => {
        this.warehouses = warehouseList;
      }, err => {
        this.toastrService.danger(`Nesanāca dabūt noliktavas`);
      });
  }

}
