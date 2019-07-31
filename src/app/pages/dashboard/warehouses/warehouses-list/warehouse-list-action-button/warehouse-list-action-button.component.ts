import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { ChangeWarehousePositionModalComponent } from '../change-warehouse-position-modal/change-warehouse-position-modal.component';
import { UserWarehouse } from '../../../../../models/warehouse.model';
import { WarehousesService } from '../../../../../services/warehouses.service';

@Component({
  selector: 'ngx-warehouse-list-action-button',
  templateUrl: './warehouse-list-action-button.component.html',
  styleUrls: ['./warehouse-list-action-button.component.scss']
})
export class WarehouseListActionButtonComponent implements OnInit {

  @Input() rowData: any;

  constructor(
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private warehouseService: WarehousesService

  ) {
  }
  openEditPositionModal() {
    const activeModal = this.modalService.open(ChangeWarehousePositionModalComponent, {
      container: 'nb-layout',
    });
    let userWarehouse = new UserWarehouse();
    userWarehouse.warehouseId = this.rowData.id;
    userWarehouse.userId = localStorage.getItem('UserId');
    activeModal.componentInstance.userWarehouse = userWarehouse;
    activeModal.componentInstance.warehouseName = this.rowData.name;
    activeModal.result.then(success => {
      if (success === 'success') {
        console.log('change');
        this.warehouseService.setUpdatedPostiion(true);
      }
      console.log('change');
    });
  }

  ngOnInit() { }

}
