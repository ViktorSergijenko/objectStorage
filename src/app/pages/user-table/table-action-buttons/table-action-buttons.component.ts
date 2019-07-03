import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPasswordModalComponent } from '../edit-password-modal/edit-password-modal.component';
import { EditUserInformationModalComponent } from '../edit-user-information-modal/edit-user-information-modal.component';
import { AccountService } from '../../../services/account.service';
import { BasketModalComponent } from '../../../@theme/components/header/basket-modal/basket-modal.component';

@Component({
  selector: 'ngx-table-action-buttons',
  templateUrl: './table-action-buttons.component.html',
  styleUrls: ['./table-action-buttons.component.scss']
})
export class TableActionButtonsComponent implements OnInit {
  /**
   * Variable get data from parent component to display info in modal window
   *
   *
   * @type {Catalog}
   * @memberof IncrementDecrementCatalogModalComponent
   */
  @Input() rowData: any;
  constructor(
    private modalService: NgbModal,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  openChangePasswordModal() {
    const activeModal = this.modalService.open(EditPasswordModalComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.userThatPasswordWeWantToChange = this.rowData;
  }

  openDeleteUser() {
    const activeModal = this.modalService.open(EditPasswordModalComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.userThatPasswordWeWantToChange = this.rowData;
  }

  openEditUser() {
    const activeModal = this.modalService.open(EditUserInformationModalComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.userThatInformationWeWantToChange = this.rowData;
    activeModal.result.then(editedUser => {
      this.accountService.setUpdatedUser({ old: this.rowData, new: editedUser });
    });
  }

  openUserBasket() {
    const activeModal = this.modalService.open(BasketModalComponent, {
      container: 'nb-layout',
      size: 'lg',
    });
    activeModal.componentInstance.userId = this.rowData.id;
  }



}
