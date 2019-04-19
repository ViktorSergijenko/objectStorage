import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { NewsService } from '../../../../../services/news.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-news-modal',
  templateUrl: './add-news-modal.component.html',
  styleUrls: ['./add-news-modal.component.scss']
})
export class AddNewsModalComponent implements OnInit {
  /**
   * Form group for new warehouse form
   *
   * @type {FormGroup}
   * @memberof AddNewsModalComponent
   */
  newNewsForm: FormGroup;
  /**
   * Error message
   *
   * @type {string}
   * @memberof AddNewsModalComponent
   */
  error: string = '';
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof AddNewsModalComponent
   */
  loadingIndicator: boolean = false;
  /**
   * Variable that will store warehouse id 
   *
   * @type {string}
   * @memberof AddNewsModalComponent
   */
  warehouseId: string;

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private newsService: NewsService,
    private toastrService: NbToastrService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    // Passing warehouse id value to our add form
    this.newNewsForm.patchValue({ WarehouseId: this.warehouseId, });
  }

  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof AddNewsModalComponent
   */
  close() {
    this.modal.dismiss();
  }

  addNews() {
    // Enable loading indicator
    this.loadingIndicator = true;
    this.newsService.addOrUpdate(this.newNewsForm.value)
      .pipe(
        // When method was executed
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      // Subscribing to method to get new warehouse
      .subscribe(newWarehouse => {
        // Closing modal window and passing new news object back to component where this modal window was opened
        this.modal.close(newWarehouse);
        this.toastrService.success(`News was added`);
      },
        // If there was an error during method execution
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`News was not added`);
        });
  }


  /**
   * Create news form
   *
   * @private
   * @memberof AddNewsModalComponent
   */
  private createForm() {
    this.newNewsForm = this.formBuilder.group({
      title: [undefined, Validators.required],
      shortDescription: [undefined, Validators.required],
      description: [undefined, Validators.required],
      WarehouseId: [undefined, Validators.required],
      fixedProblem: [false, Validators.required],
    });
  }

}
