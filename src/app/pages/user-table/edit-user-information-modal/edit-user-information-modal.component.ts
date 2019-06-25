import { Component, OnInit } from '@angular/core';
import { UserVM } from '../../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { AccountService } from '../../../services/account.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-edit-user-information-modal',
  templateUrl: './edit-user-information-modal.component.html',
  styleUrls: ['./edit-user-information-modal.component.scss']
})
export class EditUserInformationModalComponent implements OnInit {
  /**
  * Form group for new catalog form
  *
  * @type {FormGroup}
  * @memberof EditCatalogModalComponent
  */
  editUserInformationForm: FormGroup;
  userThatInformationWeWantToChange: UserVM;
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
  rolesForDropDown: string[] = [];
  role: string;
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private toastrService: NbToastrService,
    private accountService: AccountService
  ) { this.createForm(); }

  ngOnInit() {
    this.patchAllValuesToForm();
    this.getRoleList();
    console.log(this.userThatInformationWeWantToChange);
  }
  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof EditPasswordModalComponent
   */
  close() {
    this.modal.dismiss();
  }
  onDropDownSelect(role: string) {

    this.editUserInformationForm.patchValue({ roleName: role });
    this.role = role;
  }
  /**
   * Method edites catalog values
   *
   * @memberof EditCatalogModalComponent
   */
  editeUser() {
    // Enable loading indicator
    this.loadingIndicator = true;
    this.accountService.changeUserInformation(this.editUserInformationForm.value)
      .pipe(
        // When method was executed 
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      // Subscribing to method to get edited object back
      .subscribe(editedUser => {
        // Closing modal window and passing new warehouse object back to component where this modal window was opened
        this.modal.close(editedUser);
        this.toastrService.success(`Catalog was modified`);
      },
        // If there was an error during method execution
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Catalog was not modified`);
        });
  }

  getRoleList() {
    this.accountService.getRolesList().subscribe(roles => {
      this.rolesForDropDown = roles;
    });
  }
  /**
   * Method creates all controls for reactive form
   *
   * @private
   * @memberof EditCatalogModalComponent
   */
  private createForm() {
    this.editUserInformationForm = this.formBuilder.group({
      id: [undefined, Validators.required],
      email: [undefined, Validators.required],
      fullName: [undefined, Validators.required],
      roleName: [undefined, Validators.required],
    });
  }
  private patchAllValuesToForm() {
    this.editUserInformationForm.patchValue({
      id: this.userThatInformationWeWantToChange.id,
      email: this.userThatInformationWeWantToChange.email,
      fullName: this.userThatInformationWeWantToChange.fullName,
      roleName: this.userThatInformationWeWantToChange.roleName
    });
    this.role = this.userThatInformationWeWantToChange.roleName;
  }
}
