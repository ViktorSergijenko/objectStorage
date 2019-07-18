import { Component, OnInit } from '@angular/core';
import { UserWarehouse } from '../../../../../models/warehouse.model';
import { UserVM } from '../../../../../models/user';
import { AccountService } from '../../../../../services/account.service';
import { WarehousesService } from '../../../../../services/warehouses.service';

@Component({
  selector: 'ngx-warehouse-employees-modal',
  templateUrl: './warehouse-employees-modal.component.html',
  styleUrls: ['./warehouse-employees-modal.component.scss']
})
export class WarehouseEmployeesModalComponent implements OnInit {

  userWarehouse: UserWarehouse;
  usersThatHaveAccess: UserVM[] = [];
  usersThatDontHaveAccess: UserVM[] = [];
  constructor(
    private accountService: AccountService,
    private warehouseService: WarehousesService
  ) { }

  ngOnInit() {
    console.log(this.userWarehouse);
    this.getUsersThatDontHaveAccess();
    this.getUserThatAllowedToUseWarehouse();
  }

  getUsersThatDontHaveAccess() {
    this.usersThatDontHaveAccess = [];
    this.accountService.getEmployeesThatDontHaveAccess(this.userWarehouse)
      .subscribe(usersThatDontHaveAccess => { this.usersThatDontHaveAccess = usersThatDontHaveAccess });
  }
  getUserThatAllowedToUseWarehouse() {
    this.usersThatHaveAccess = [];
    this.warehouseService.getUsersThatAllowToUseWarehouse(this.userWarehouse)
      .subscribe(usersThatHaveAccess => { this.usersThatHaveAccess = usersThatHaveAccess });
  }

  AddAccessForUser(userId: string) {
    let userWarehouse = new UserWarehouse();
    userWarehouse.userId = userId;
    userWarehouse.warehouseId = this.userWarehouse.warehouseId;
    this.warehouseService.addUserToUseWarehouse(userWarehouse)
      .subscribe(addedUser => {
        this.getUsersThatDontHaveAccess();
        this.getUserThatAllowedToUseWarehouse();
      });
  }

  toggleAmountSeeAbility(userId: string) {
    let userWarehouse = new UserWarehouse();
    userWarehouse.userId = userId;
    userWarehouse.warehouseId = this.userWarehouse.warehouseId;
    this.warehouseService.toggleAmountSeeAbility(userWarehouse)
      .subscribe(addedUser => {
        this.getUsersThatDontHaveAccess();
        this.getUserThatAllowedToUseWarehouse();
      });
  }
  RemoveAccessForUser(userId: string) {
    let userWarehouse = new UserWarehouse();
    userWarehouse.userId = userId;
    userWarehouse.warehouseId = this.userWarehouse.warehouseId;
    this.warehouseService.removeUserFromWarehouse(userWarehouse)
      .subscribe(removedUser => {
        this.getUsersThatDontHaveAccess();
        this.getUserThatAllowedToUseWarehouse();
      });
  }

}
