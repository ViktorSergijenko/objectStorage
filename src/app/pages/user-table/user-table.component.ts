import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AccountService } from '../../services/account.service';
import { TableActionButtonsComponent } from './table-action-buttons/table-action-buttons.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})


export class UserTableComponent implements OnInit {

  /**
   * Subscription that monitors for catalog updates. Used to track changes for catalog values
   *
   * @type {Subscription}
   * @memberof UserFeedbackListComponent
   */
  userUpdate: Subscription;
  toggleGetUsers: Subscription;

  regularUserRole: string = 'Level four';
  userRole: string;
  settings = {
    actions: false,
    pager: {
      display: false,
    },
    columns: {
      fullName: {
        title: 'Darbnieks',
        type: 'string',
      },
      email: {
        title: 'E-pasta',
        type: 'string',
      },
      roleName: {
        title: 'Loma',
        type: 'string',
      },
      action: {
        title: 'Darbības',
        type: 'custom',
        renderComponent: TableActionButtonsComponent
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private accountService: AccountService,
    private router: Router

  ) { this.userRole = localStorage.getItem('Role'); }

  ngOnInit() {
    if (this.userRole === this.regularUserRole) {
      this.router.navigateByUrl('pages/400');
    }
    else {
      this.getUserListForTable();

    }
    this.userUpdate = this.accountService.getUpdatedUser()
      .subscribe(update => {
        this.source.update(update.old, update.new)
      });
    this.toggleGetUsers = this.accountService.getUpdatedToggle()
      .subscribe(() => {
        this.source.empty();
        this.getUserListForTable();
      });
  }

  ngOnDestroy() {
    // Unsubscribe from catalog update Subscription
    this.userUpdate.unsubscribe();
    this.toggleGetUsers.unsubscribe();
  }


  getUserListForTable() {
    this.accountService.getUserList()
      .subscribe(userList => {
        this.source.load(userList);
      });
  }
}
