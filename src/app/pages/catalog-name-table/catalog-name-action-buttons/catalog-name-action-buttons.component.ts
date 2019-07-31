import { Component, OnInit, Input } from '@angular/core';
import { Warehouse } from '../../../models/warehouse.model';
import { WarehouseListWithCatalogNamesComponent } from '../warehouse-list-with-catalog-names/warehouse-list-with-catalog-names.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogName } from '../../../models/catalog-name.model';

@Component({
  selector: 'ngx-catalog-name-action-buttons',
  templateUrl: './catalog-name-action-buttons.component.html',
  styleUrls: ['./catalog-name-action-buttons.component.scss']
})
export class CatalogNameActionButtonsComponent implements OnInit {
  /**
   * Variable that stores information about catalog name
   *
   * @type {CatalogName}
   * @memberof CatalogNameActionButtonsComponent
   */
  @Input() rowData: CatalogName;
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  /**
   * Method opens modal window with list of warehouses that stores catalog with specific name
   *
   * @memberof CatalogNameActionButtonsComponent
   */
  openWarehouseListModal() {
    // Opening modal window where we can add new Warehouse
    const activeModal = this.modalService.open(WarehouseListWithCatalogNamesComponent, {

      container: 'nb-layout',
    });
    activeModal.componentInstance.catalogNameId = this.rowData.id;
  }
}
