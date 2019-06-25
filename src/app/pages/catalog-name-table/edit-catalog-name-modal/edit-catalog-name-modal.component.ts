import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from '../../../services/catalog.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { CatalogName } from '../../../models/catalog-name.model';

@Component({
  selector: 'ngx-edit-catalog-name-modal',
  templateUrl: './edit-catalog-name-modal.component.html',
  styleUrls: ['./edit-catalog-name-modal.component.scss']
})
export class EditCatalogNameModalComponent implements OnInit {
  /**
   * Form group for new catalog name form
   *
   * @type {FormGroup}
   * @memberof AddNewCatalogNameModalComponent
   */
  addCatalogNameForm: FormGroup;
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof AddNewCatalogModalComponent
   */
  loadingIndicator: boolean = false;
  /**
   * Error message
   *
   * @type {string}
   * @memberof AddNewCatalogModalComponent
   */
  error: string = '';
  catalogName: CatalogName = new CatalogName();
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private catalogService: CatalogService,
    private toastrService: NbToastrService
  ) { this.createForm() }
  ngOnInit() {
    this.patchValuesToForm();
  }
  /**
     * Method closes (dismisses) current modal windows
     *
     * @memberof EditCatalogModelComponent
     */
  close() {
    this.modal.dismiss();
  }
  private createForm() {
    this.addCatalogNameForm = this.formBuilder.group({
      id: [undefined, Validators.required],
      name: [undefined, Validators.required],
    });
  }

  patchValuesToForm() {
    this.addCatalogNameForm.patchValue({ id: this.catalogName.id });
    this.addCatalogNameForm.patchValue({ name: this.catalogName.name });
  }
  private editCatalogName() {
    this.catalogService.addOrUpdateCatalogName(this.addCatalogNameForm.value)
      .pipe(
        // When method was executed
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      .subscribe(newCatalog => {
        // Closing modal window and passing new object back to component where this modal window was opened
        this.toastrService.success(`Catalog name was edited`);
        this.modal.close(newCatalog);
      },
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Catalog name was not edited`);
        });
  }
}
