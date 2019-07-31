import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { CatalogTypeService } from '../../../services/catalog-type.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-add-catalog-type-modal',
  templateUrl: './add-catalog-type-modal.component.html',
  styleUrls: ['./add-catalog-type-modal.component.scss']
})
export class AddCatalogTypeModalComponent implements OnInit {
  /**
   * Form group for new catalog type form
   *
   * @type {FormGroup}
   * @memberof AddCatalogTypeModalComponent
   */
  addCatalogTypeForm: FormGroup;
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof AddCatalogTypeModalComponent
   */
  loadingIndicator: boolean = false;
  /**
   * Error message
   *
   * @type {string}
   * @memberof AddCatalogTypeModalComponent
   */
  error: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private catalogTypeService: CatalogTypeService,
    private toastrService: NbToastrService
  ) { this.createForm(); }

  ngOnInit() {
    this.addCatalogTypeForm.patchValue({ userId: localStorage.getItem('UserId') });
  }

  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof AddCatalogTypeModalComponent
   */
  close() {
    this.modal.dismiss();
  }
  /**
   * Method creates form controls
   *
   * @private
   * @memberof AddCatalogTypeModalComponent
   */
  private createForm() {
    this.addCatalogTypeForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      userId: [undefined, Validators.required]
    });
  }

  private addCatalogType() {
    this.catalogTypeService.saveCatalogType(this.addCatalogTypeForm.value)
      .pipe(
        // When method was executed
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      .subscribe(newCatalogType => {
        // Closing modal window and passing new object back to component where this modal window was opened
        this.toastrService.success(`Katalogu tips bija izveidots`);
        this.modal.close(newCatalogType);
      },
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Katalogu tips nebija izveidots`);
        });
  }
}
