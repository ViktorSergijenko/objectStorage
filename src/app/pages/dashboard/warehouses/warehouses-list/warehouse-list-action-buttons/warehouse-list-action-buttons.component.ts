import { Component, OnInit, Input } from '@angular/core';
import { Warehouse } from '../../../../../models/warehouse.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-warehouse-list-action-buttons',
  templateUrl: './warehouse-list-action-buttons.component.html',
  styleUrls: ['./warehouse-list-action-buttons.component.scss']
})
export class WarehouseListActionButtonsComponent implements OnInit {
  @Input() rowData: any;

  constructor(
    private modalService: NgbModal,
    private toastrService: NbToastrService

  ) {
    console.log('pzidts');
    console.log(this.rowData);
  }

  ngOnInit() {
  }
}
