import { Component, OnInit } from '@angular/core';
import { UserWarehouse } from '../../../../../models/warehouse.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { WarehousesService } from '../../../../../services/warehouses.service';

@Component({
  selector: 'ngx-change-warehouse-position-modal',
  templateUrl: './change-warehouse-position-modal.component.html',
  styleUrls: ['./change-warehouse-position-modal.component.scss']
})
export class ChangeWarehousePositionModalComponent implements OnInit {
  editPositionForm: FormGroup;
  /**
   * Error message
   *
   * @type {string}
   * @memberof EditCatalogModelComponent
   */
  error: string = '';
  allWarehousesCount: number;
  warehouseName: string;

  userWarehouse: UserWarehouse;
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private warehouseService: WarehousesService,
    private toastrService: NbToastrService
  ) {
    this.createForm();
  }

  close() {
    this.modal.dismiss();
  }
  ngOnInit() {
    console.log(this.userWarehouse);
    this.warehouseService.getUserWarehouseById(this.userWarehouse)
      .subscribe(x => {
        this.editPositionForm.patchValue(x);
      }, err => {
        this.toastrService.danger(`Nevarēja iegūt pozīciju`);
      });
  }

  private createForm() {
    this.editPositionForm = this.formBuilder.group({
      warehouseId: [undefined, Validators.required],
      userId: [undefined, Validators.required],
      warehousePositionInTable: [undefined, Validators.required],
    });
  }
  submitButton() {
    this.warehouseService.editWarehousePosition(this.editPositionForm.value)
      .subscribe(() => {
        this.toastrService.success(`Pozicija bija izmainita`);
        this.modal.close("success");
      }, err => {
        this.toastrService.danger(`Pozicija nebija izmainita`);
        this.close();
      });
  }
}
