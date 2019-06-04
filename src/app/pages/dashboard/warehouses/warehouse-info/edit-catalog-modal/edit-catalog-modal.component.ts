import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from '../../../../../services/catalog.service';
import { NbToastrService } from '@nebular/theme';
import { Catalog } from '../../../../../models/catalog.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-edit-catalog-modal',
  templateUrl: './edit-catalog-modal.component.html',
  styleUrls: ['./edit-catalog-modal.component.scss']
})
export class EditCatalogModalComponent implements OnInit {
  /**
  * Form group for new catalog form
  *
  * @type {FormGroup}
  * @memberof EditCatalogModalComponent
  */
  editCatalogForm: FormGroup;
  /**
   * Error message
   *
   * @type {string}
   * @memberof EditCatalogModalComponent
   */
  error: string = '';
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof EditCatalogModalComponent
   */
  loadingIndicator: boolean = false;
  /**
   * Variable that will store catalog object, that needs to be edited
   *
   * @type {Catalog}
   * @memberof EditCatalogModalComponent
   */
  catalogToEdit: Catalog;

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private catalogService: CatalogService,
    private toastrService: NbToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.patchAllValuesToForm();
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
   * Method edites catalog values
   *
   * @memberof EditCatalogModalComponent
   */
  editeCatalog() {
    // Enable loading indicator
    this.loadingIndicator = true;
    this.catalogService.addOrUpdate(this.editCatalogForm.value)
      .pipe(
        // When method was executed 
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      // Subscribing to method to get edited object back
      .subscribe(editedCatalog => {
        // Closing modal window and passing new warehouse object back to component where this modal window was opened
        this.modal.close(editedCatalog);
        this.toastrService.success(`Catalog was modified`);
      },
        // If there was an error during method execution
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Warehouse was not modified`);
        });
  }
  /**
   * Method creates all controls for reactive form
   *
   * @private
   * @memberof EditCatalogModalComponent
   */
  private createForm() {
    this.editCatalogForm = this.formBuilder.group({
      id: [undefined, Validators.required],
      name: [undefined, Validators.required],
      currentAmount: [undefined, Validators.required],
      maximumAmount: [undefined, Validators.required],
      minimumAmount: [undefined, Validators.required],
      warehouseId: [undefined, Validators.required],
    });
  }
  /**
   * Method patchs(initialize) all controls with values
   *
   * @private
   * @memberof EditCatalogModalComponent
   */
  private patchAllValuesToForm() {
    this.editCatalogForm.patchValue({
      id: this.catalogToEdit.id,
      name: this.catalogToEdit.name,
      currentAmount: this.catalogToEdit.currentAmount,
      maximumAmount: this.catalogToEdit.maximumAmount,
      minimumAmount: this.catalogToEdit.minimumAmount,
      warehouseId: this.catalogToEdit.warehouseId
    });
  }

}
