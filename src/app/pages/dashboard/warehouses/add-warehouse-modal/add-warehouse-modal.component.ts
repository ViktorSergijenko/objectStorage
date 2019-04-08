import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Warehouse, WarehouseType } from '../../../../models/warehouse.model';
import { WarehousesService } from '../warehouses.service';
import { finalize } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-warehouse-modal',
  templateUrl: './add-warehouse-modal.component.html',
  styleUrls: ['./add-warehouse-modal.component.scss']
})
export class AddWarehouseModalComponent implements OnInit {
  /**
   * Form group for new warehouse form
   *
   * @type {FormGroup}
   * @memberof AddWarehouseModalComponent
   */
  newWarehouseForm: FormGroup;
  /**
   * Error message
   *
   * @type {string}
   * @memberof AddWarehouseModalComponent
   */
  error: string = '';
  selectedFile = null;
  names: string[] = [
    "Main warehouse",
    "Simple warehouse"
  ]
  type: string;
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof AddWarehouseModalComponent
   */
  loadingIndicator: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private warehouseService: WarehousesService,
    private toasterService: NbToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log('dsa')
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
    console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.selectedFile = reader.result;
      this.newWarehouseForm.patchValue({ imageBase64: reader.result });

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
    if (type === 'Main warehouse') {
      this.newWarehouseForm.patchValue({ type: WarehouseType.MainWarehouse });
      this.type = type;
    } else {
      this.newWarehouseForm.patchValue({ type: WarehouseType.SimpleWarehouse });
      this.type = type;
    }
    console.log(this.type);

  }

  addWarehouse() {
    // Enable loading indicator
    this.loadingIndicator = true;
    this.warehouseService.addOrUpdate(this.newWarehouseForm.value)
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
      },
        // If there was an error during method execution
        err => {
          // Initialize our error value with error message that came
          this.error = err;
        });
  }

  private createForm() {
    this.newWarehouseForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      address: [undefined, Validators.required],
      location: [undefined, Validators.required],
      imageBase64: [undefined, Validators.required],
      type: [undefined, Validators.required],
    });
  }
}
