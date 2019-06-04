import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * Form group for login form
   *
   * @type {FormGroup}
   * @memberof LoginComponent
   */
  loginForm: FormGroup;
  successMessage: string;
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof LoginComponent
   */
  loadingIndicator: boolean = false;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }
  loginUser() {
    this.loadingIndicator = true;
    this.accountService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loadingIndicator = false;
      }))
      .subscribe((userTooken: any) => {
        localStorage.setItem('UserToken', userTooken.access_token);
        this.router.navigateByUrl('/pages/warehouse/list');
      },
        err => {
          if (err.status === 400) {
            this.toastrService.danger(`Incorrect email or password`, `Authentification failed.`);
          }
        })
  }
  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: [undefined, Validators.required, Validators.email],
      password: [undefined, Validators.required]
    });
  }

}
