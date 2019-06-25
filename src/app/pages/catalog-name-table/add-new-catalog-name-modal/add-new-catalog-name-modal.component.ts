import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { CatalogService } from '../../../services/catalog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-add-new-catalog-name-modal',
  templateUrl: './add-new-catalog-name-modal.component.html',
  styleUrls: ['./add-new-catalog-name-modal.component.scss']
})
export class AddNewCatalogNameModalComponent implements OnInit {
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
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private catalogService: CatalogService,
    private toastrService: NbToastrService
  ) { this.createForm() }
  ngOnInit() {
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
      name: [undefined, Validators.required],
    });
  }

  private addCatalogName() {
    this.catalogService.addOrUpdateCatalogName(this.addCatalogNameForm.value)
      .pipe(
        // When method was executed
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      .subscribe(newCatalog => {
        // Closing modal window and passing new object back to component where this modal window was opened
        this.toastrService.success(`Catalog name was added`);
        this.modal.close(newCatalog);
      },
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Catalog name was not added`);
        });
  }
}
