import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from '../../../../../services/catalog.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-add-new-catalog-modal',
  templateUrl: './add-new-catalog-modal.component.html',
  styleUrls: ['./add-new-catalog-modal.component.scss']
})
export class AddNewCatalogModalComponent implements OnInit {
  /**
  * Form group for new catalog form
  *
  * @type {FormGroup}
  * @memberof AddNewCatalogModalComponent
  */
  addCatalogForm: FormGroup;
  /**
   * Error message
   *
   * @type {string}
   * @memberof AddNewCatalogModalComponent
   */
  error: string = '';
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof AddNewCatalogModalComponent
   */
  loadingIndicator: boolean = false;
  /**
   * Variable that stores warehouse id, so we would know where to add new catalog
   *
   * @type {string}
   * @memberof AddNewCatalogModalComponent
   */
  warehouseId: string;
  constructor
    (
      private formBuilder: FormBuilder,
      private modal: NgbActiveModal,
      private catalogService: CatalogService,
      private toastrService: NbToastrService
    ) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.warehouseId);
    this.addCatalogForm.patchValue({ warehouseId: this.warehouseId });
    console.log(this.addCatalogForm.value);
  }

  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof EditCatalogModelComponent
   */
  close() {
    this.modal.dismiss();
  }

  /**
   * Method adds new catalog to warehouse
   *
   * @memberof AddNewCatalogModalComponent
   */
  addCatalogToWarehouse() {
    this.loadingIndicator = true;
    this.catalogService.addOrUpdate(this.addCatalogForm.value)
      .pipe(
        // When method was executed
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      .subscribe(newCatalog => {
        // Closing modal window and passing new object back to component where this modal window was opened
        this.toastrService.success(`Catalog was added`);
        this.modal.close(newCatalog);
      },
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Catalog was not added`);
        });
  }

  private createForm() {
    this.addCatalogForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      currentAmount: [0, Validators.required],
      maximumAmount: [undefined, Validators.required],
      minimumAmount: [undefined, Validators.required],
      warehouseId: ['', Validators.required],
      productPrice: [undefined, Validators.required],
    });
    this.addCatalogForm.patchValue({ currentAmount: 0 });
  }

}
