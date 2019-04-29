import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { AccountService } from '../../services/account.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  /**
   * Form group for new warehouse form
   *
   * @type {FormGroup}
   * @memberof AddWarehouseModalComponent
   */
  registrationForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof RegistrationComponent
   */
  loadingIndicator: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  addNewUser() {
    // Enable loading indicator
    this.loadingIndicator = true;
    this.accountService.addUser(this.registrationForm.value)
      .pipe(
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        })
      )
      .subscribe(newUser => {
        this.toastrService.success(`User was added`);
        this.successMessage = "User was added";
      },
        // If there was an error during method execution
        err => {
          // Initialize our error value with error message that came
          this.errorMessage = err;
          this.toastrService.danger(`User was not added`);
        })
  }

  private createForm() {
    this.registrationForm = this.formBuilder.group({
      fullName: [undefined, Validators.required],
      email: [undefined, Validators.required, Validators.email],
      password: [undefined, Validators.required, Validators.minLength(6)],
      passwordConfirm: [undefined, Validators.required],
    });
  }
}
