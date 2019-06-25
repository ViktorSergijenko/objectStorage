import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from '../../../../../services/catalog.service';
import { NbToastrService } from '@nebular/theme';
import { finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterSorting } from '../../../../../models/filter-sort.model';
import { CatalogName } from '../../../../../models/catalog-name.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-add-new-catalog-modal',
  templateUrl: './add-new-catalog-modal.component.html',
  styleUrls: ['./add-new-catalog-modal.component.scss']
})
export class AddNewCatalogModalComponent implements OnInit, OnDestroy {
  /**
  * Form group for new catalog form
  *
  * @type {FormGroup}
  * @memberof AddNewCatalogModalComponent
  */
  addCatalogForm: FormGroup;
  /**
   * Error message
   *
   * @type {string}
   * @memberof AddNewCatalogModalComponent
   */
  error: string = '';
  /**
   * Flag that indicates if loading indicator is active or not
   *
   * @type {boolean}
   * @memberof AddNewCatalogModalComponent
   */
  loadingIndicator: boolean = false;
  filterSortingOption: FilterSorting = new FilterSorting;
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
  /**
   * Variable that stores warehouse id, so we would know where to add new catalog
   *
   * @type {string}
   * @memberof AddNewCatalogModalComponent
   */
  warehouseId: string;
  catalogNameList: CatalogName[] = [];
  name: string = '';

  @ViewChild(NgbDropdown)
  private dropdown: NgbDropdown;
  constructor
    (
      private formBuilder: FormBuilder,
      private modal: NgbActiveModal,
      private catalogService: CatalogService,
      private toastrService: NbToastrService
    ) {
    this.createForm();
  }

  ngOnInit() {
    this.addCatalogForm.patchValue({ warehouseId: this.warehouseId });
    this.searchValueChanged.pipe(
      // Wait 400ms after the last event before emitting last event
      debounceTime(400),
      // Only emit if value is different from previous value
      distinctUntilChanged(),
    )
      .subscribe(newSearchVal => {
        // Set new search value on input
        this.searchValue = newSearchVal;
        this.getFilteredCatalogList(this.searchValue);
      });
  }
  ngOnDestroy() {
    // Unsubscribe from search value changes to avoid memory leaks
    this.searchValueChanged.unsubscribe();
  }
  openDropdown() {
    this.dropdown.open();
  }
  onDropDownSelect(name: string) {
    this.addCatalogForm.patchValue({ name: name });
  }
  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof EditCatalogModelComponent
   */
  close() {
    this.modal.dismiss();
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
    if (searchText !== '') {
      this.dropdown.open();
    }
  }
  /**
   * Method adds new catalog to warehouse
   *
   * @memberof AddNewCatalogModalComponent
   */
  addCatalogToWarehouse() {
    this.loadingIndicator = true;
    this.catalogService.addOrUpdate(this.addCatalogForm.value)
      .pipe(
        // When method was executed
        finalize(() => {
          // Disable loading indicator
          this.loadingIndicator = false;
        }))
      .subscribe(newCatalog => {
        // Closing modal window and passing new object back to component where this modal window was opened
        this.toastrService.success(`Catalog was added`);
        this.modal.close(newCatalog);
      },
        err => {
          // Initialize our error value with error message that came
          this.error = err;
          this.toastrService.danger(`Catalog was not added`);
        });
  }

  private getFilteredCatalogList(filterOption: string) {
    this.filterSortingOption.filterOption = filterOption;
    this.catalogService.getFilteredCatalogName(this.filterSortingOption)
      .subscribe(filteredList => {
        this.catalogNameList = []
        this.catalogNameList = filteredList;
        console.log(this.catalogNameList);
      });
  }
  private createForm() {
    this.addCatalogForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      currentAmount: [0, Validators.required],
      maximumAmount: [undefined, Validators.required],
      minimumAmount: [undefined, Validators.required],
      warehouseId: ['', Validators.required],
      productPrice: [undefined, Validators.required],
    });
    this.addCatalogForm.patchValue({ currentAmount: 0 });
  }

}
