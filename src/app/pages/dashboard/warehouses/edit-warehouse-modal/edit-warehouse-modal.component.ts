import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { WarehousesService } from '../../../../services/warehouses.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseType, Warehouse } from '../../../../models/warehouse.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-edit-warehouse-modal',
  templateUrl: './edit-warehouse-modal.component.html',
  styleUrls: ['./edit-warehouse-modal.component.scss']
})
export class EditWarehouseModalComponent implements OnInit {
  /**
  * Form group for new warehouse form
  *
  * @type {FormGroup}
  * @memberof AddWarehouseModalComponent
  */
  editWarehouseForm: FormGroup;
  /**
   * Error message
   *
   * @type {string}
   * @memberof AddWarehouseModalComponent
   */
  error: string = '';
  selectedFile = null;
  names: string[] = [
    'Galvenā noliktava',
    'Vienkārša noliktava',
  ]
  type: string;
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof AddWarehouseModalComponent
   */
  loadingIndicator: boolean = false;
  warehouseToEdit: Warehouse = new Warehouse();

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private warehouseService: WarehousesService,
    private toastrService: NbToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.warehouseToEdit.type === WarehouseType.MainWarehouse) {

      this.type = 'Galvenā noliktava';
    } else {
      this.type = 'Vienkārša noliktava';
    }
    this.editWarehouseForm.patchValue({
      id: this.warehouseToEdit.id,
      name: this.warehouseToEdit.name,
      address: this.warehouseToEdit.address,
      location: this.warehouseToEdit.location,
      imageBase64: this.warehouseToEdit.imageBase64,
      type: this.warehouseToEdit.type
    });
  }

  /**
  * Method closes (dismisses) current modal windows
  *
  * @memberof AddWarehouseModalComponent
  */
  close() {
    this.modal.dismiss();
  }
  onFileSelected(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.selectedFile = reader.result;
      this.editWarehouseForm.patchValue({ imageBase64: reader.result });

    };
    reader.onerror = function (error) {
    };
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      myReader.readAsDataURL(file);
      this.selectedFile = myReader.result;

    }

  }
  onDropDownSelect(type: string) {
    if (type === 'Galvenā noliktava') {
      this.editWarehouseForm.patchValue({ type: WarehouseType.MainWarehouse });
      this.type = type;
    } else {
      this.editWarehouseForm.patchValue({ type: WarehouseType.SimpleWarehouse });
      this.type = type;
    }
  }
  editWarehouse() {
    // Enable loading indicator
    this.loadingIndicator = true;
    this.warehouseService.addOrUpdate(this.editWarehouseForm.value)
      .pipe(
        // When method was executed 
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      // Subscribing to method to get new warehouse
      .subscribe(newWarehouse => {
        // Closing modal window and passing new warehouse object back to component where this modal window was opened
        this.modal.close(newWarehouse);
        this.toastrService.success(`Noliktava tiek rediģēts`);
      },
        // If there was an error during method execution
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Noliktava nebija rediģēts`);
        });
  }
  private createForm() {
    this.editWarehouseForm = this.formBuilder.group({
      id: [undefined, Validators.required],
      name: [undefined, Validators.required],
      address: [undefined, Validators.required],
      location: [undefined, Validators.required],
      imageBase64: [undefined, Validators.required],
      type: [undefined, Validators.required],
    });
  }

}
