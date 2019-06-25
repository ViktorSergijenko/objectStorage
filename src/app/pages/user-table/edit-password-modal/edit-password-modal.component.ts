import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { ChangePasswordViewModel, UserVM } from '../../../models/user';
import { AccountService } from '../../../services/account.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss']
})
export class EditPasswordModalComponent implements OnInit {
  /**
  * Form group for new catalog form
  *
  * @type {FormGroup}
  * @memberof EditCatalogModalComponent
  */
  editPasswordForm: FormGroup;
  userThatPasswordWeWantToChange: UserVM;
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
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private toastrService: NbToastrService,
    private accountService: AccountService
  ) {

    this.createForm();
  }

  ngOnInit() {
    this.patchAllValuesToForm();
  }

  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof EditPasswordModalComponent
   */
  close() {
    this.modal.dismiss();
  }

  changePassword() {
    // Enable loading indicator
    this.loadingIndicator = true;
    this.accountService.changeUserPassword(this.editPasswordForm.value)
      .pipe(
        // When method was executed 
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      .subscribe(editedCatalog => {
        this.modal.close();
        this.toastrService.success(`Password was modified`);
      },
        // If there was an error during method execution
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Password was not modified`);
        });
  }

  /**
   * Method creates all controls for reactive form
   *
   * @private
   * @memberof EditCatalogModalComponent
   */
  private createForm() {
    this.editPasswordForm = this.formBuilder.group({
      id: [undefined, Validators.required],
      email: [undefined, Validators.required],
      newPassword: [undefined, Validators.required],
    });
  }

  private patchAllValuesToForm() {
    this.editPasswordForm.patchValue({
      id: this.userThatPasswordWeWantToChange.id,
      email: this.userThatPasswordWeWantToChange.email
    });
  }

}
