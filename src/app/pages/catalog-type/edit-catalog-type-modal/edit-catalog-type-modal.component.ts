import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogType } from '../../../models/catalog-type';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from '../../../services/catalog.service';
import { CatalogTypeService } from '../../../services/catalog-type.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-edit-catalog-type-modal',
  templateUrl: './edit-catalog-type-modal.component.html',
  styleUrls: ['./edit-catalog-type-modal.component.scss']
})
export class EditCatalogTypeModalComponent implements OnInit {
  /**
   * Form group for edit catalog type
   *
   * @type {FormGroup}
   * @memberof EditCatalogTypeModalComponent
   */
  editCatalogTypeForm: FormGroup;
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof EditCatalogTypeModalComponent
   */
  loadingIndicator: boolean = false;
  /**
   * Error message
   *
   * @type {string}
   * @memberof EditCatalogTypeModalComponent
   */
  error: string = '';
  /**
   * Variable that will store all information about catalog type that we want to edit(used to patch values into form)
   *
   * @type {CatalogType}
   * @memberof EditCatalogTypeModalComponent
   */
  catalogType: CatalogType = new CatalogType();
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private catalogTypeService: CatalogTypeService,
    private toastrService: NbToastrService
  ) { this.createForm() }

  ngOnInit() {
    this.patchValuesToForm();
  }
  /**
   * Method creates edit form controls
   *
   * @private
   * @memberof EditCatalogTypeModalComponent
   */
  private createForm() {
    this.editCatalogTypeForm = this.formBuilder.group({
      id: [undefined, Validators.required],
      name: [undefined, Validators.required],
      userId: [undefined, Validators.required]
    });
  }
  /**
  * Method closes (dismisses) current modal windows
  *
  * @memberof EditCatalogTypeModalComponent
  */
  close() {
    this.modal.dismiss();
  }
  /**
   * Method patches values to form
   *
   * @memberof EditCatalogTypeModalComponent
   */
  patchValuesToForm() {
    this.editCatalogTypeForm.patchValue(this.catalogType);
  }

  /**
   * Method edits catalog type values
   *
   * @private
   * @memberof EditCatalogTypeModalComponent
   */
  editCatalogType() {
    this.catalogTypeService.saveCatalogType(this.editCatalogTypeForm.value)
      .pipe(
        // When method was executed
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      .subscribe(newCatalog => {
        // Closing modal window and passing new object back to component where this modal window was opened
        this.toastrService.success(`Katalogu tips bija parmainits`);
        this.modal.close(newCatalog);
      },
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Katalogu tips nebija parmainits`);
        });
  }
}
