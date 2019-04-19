import { Component, OnInit } from '@angular/core';
import { WarehousesService } from '../../../../services/warehouses.service';
import { Warehouse } from '../../../../models/warehouse.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterSorting } from '../../../../models/filter-sort.model';
import { Subject } from 'rxjs';
import { AddWarehouseModalComponent } from '../add-warehouse-modal/add-warehouse-modal.component';
import { EditWarehouseModalComponent } from '../edit-warehouse-modal/edit-warehouse-modal.component';
import { finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-warehouses-list',
  templateUrl: './warehouses-list.component.html',
  styleUrls: ['./warehouses-list.component.scss']
})
export class WarehousesListComponent implements OnInit {

  /**
   * Variable that stores path to an image that will be displayed
   *
   * @type {string}
   * @memberof WarehousesListComponent
   */
  imageSourcePath: string;
  warehouseList: Warehouse[] = [];
  /**
   * ngModels change subject (Search input). It triggers event which emits search input value
   * and it can be debounced
   *
   * @type {Subject<string>}
   * @memberof WarehousesListComponent
   */
  searchValueChanged: Subject<string> = new Subject();
  /**
   * Search value in search input, used to filter images that are displayed
   *
   * @type {string}
   * @memberof FileManagerListComponent
   */
  searchValue: string = '';
  isLoading: boolean = true;

  filterSortingOption: FilterSorting = new FilterSorting;
  constructor(
    private warehouseService: WarehousesService,
    private modalService: NgbModal,
    private router: Router,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.getWarehouseList();
    this.searchValueChanged.pipe(
      // Wait 400ms after the last event before emitting last event
      debounceTime(400),
      // Only emit if value is different from previous value
      distinctUntilChanged(),
    )
      .subscribe(newSearchVal => {
        // Set new search value on input
        this.searchValue = newSearchVal;
        this.getFilteredWarehouseList(this.searchValue);
      });

  }

  ngOnDestroy() {
    // Unsubscribe from search value changes to avoid memory leaks
    this.searchValueChanged.unsubscribe();
  }

  /**
   * Method navigates user to warehouse details page
   *
   * @param {string} idForRoute Id of an warehouse that user has selected
   * @memberof WarehousesListComponent
   */
  goToAdditionalInformationPage(idForRoute: string) {
    // Navigating user to details page
    this.router.navigate([`pages/warehouse/details/${idForRoute}`]);
  }

  /**
   * Method gets triggered when search input value changes
   *
   * @param {string} searchText Search input value (search text)
   * @memberof WarehousesListComponent
   */
  searchTextChanged(searchText: string) {
    // Notify about search value change
    this.searchValueChanged.next(searchText);
  }

  /**
   * Method removes selected warehouse
   *
   * @param {Warehouse} selectedWarehouse Warehouse that has been selected to be deleted
   * @memberof DashboardComponent
   */
  removeWarehouse(selectedWarehouse: Warehouse) {
    this.warehouseService.removeWarehouse(selectedWarehouse.id).subscribe(() => {
      // When method will be executed without errors, we will delete selected warehouse from warehouse list that is used to display warehouses...
      // by using method filter, we leave only those objects in list, that are not equal to selected warehouse
      this.warehouseList = this.warehouseList.filter(warehouses => warehouses !== selectedWarehouse);
      this.toastrService.success(`Warehouse was deleted`);
    }, err => {
      this.toastrService.danger(`Warehouse was not deleted`);
    });
  }


  /**
   * Method opens modal window with form to add a new Warehouse
   *
   * @memberof WarehousesListComponent
   */
  openAddHouseModal() {
    // Opening modal window where we can add new Warehouse
    const activeModal = this.modalService.open(AddWarehouseModalComponent, {

      container: 'nb-layout',
    });
    // When modal window was closed it can pass data back to uss...
    activeModal.result.then(newWarehouse => {
      // Push new warehouse to the warehouse list that is used to display them 
      this.warehouseList.push(newWarehouse);
    });
  }

  /**
   * Method opens modal window with form to edit a Warehouse
   *
   * @memberof WarehousesListComponent
   */
  openEditHouseModal(warehouseToEdit: Warehouse) {
    // Opening modal window where we can edit Warehouse
    const activeModal = this.modalService.open(EditWarehouseModalComponent, {
      container: 'nb-layout',
    });
    // Passing object that we want to edit to the modal window...
    // Using 'Object.assign' to avoid issues, when we changing warehouse values in input, and it is instantly changed in display list too
    // Thx to 'Object.assign' in the modal window, we are working with a copie of selected media file, not with origin
    activeModal.componentInstance.warehouseToEdit = Object.assign({}, warehouseToEdit);
    activeModal.componentInstance.selectedFile = warehouseToEdit.imageBase64;
    // When modal window was closed it can pass data back to uss...
    activeModal.result.then(newWarehouse => {
      // Getting data that has came back from modal window
      // Using 'Object.assing' to instantly update warehouse  object values in list where it is displayed
      warehouseToEdit = Object.assign(warehouseToEdit, newWarehouse);
    })
  }




  /**
   * Method gets warehouse list to display
   *
   * @private
   * @memberof DashboardComponent
   */
  private getWarehouseList() {
    // Calling method that will send a get request
    this.warehouseService.getAllWarehouses()
      .pipe(
        finalize(() => {
          this.isLoading = false
        }))
      // Subscribing to method to receive data
      .subscribe((warehouses: Warehouse[]) => {
        // Initializing our local variable with data that has come
        this.warehouseList = warehouses;
      });
  }
  /**
* Method fets filtered warehouse list
*
* @private
* @param {string} filterOption Filtered option by that filtering will be done
* @memberof DashboardComponent
*/
  private getFilteredWarehouseList(filterOption: string) {
    this.filterSortingOption.filterOption = filterOption;
    this.warehouseService.getFilteredWarehouses(this.filterSortingOption)
      .subscribe(filteredList => {
        this.warehouseList = []
        this.warehouseList = filteredList;
        console.log(this.warehouseList);
      });
  }
}
