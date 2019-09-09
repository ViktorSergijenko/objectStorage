import { Component, OnInit, ɵConsole } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CatalogService } from '../../../../services/catalog.service';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../../services/basket.service';
import { Catalog } from '../../../../models/catalog.model';
import { CatalogType } from '../../../../models/catalog-type';
import { WarehouseCatalogFiltrationByType } from '../../../../models/filter-sort.model';
import { CatalogTypeService } from '../../../../services/catalog-type.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-basket-modal',
  templateUrl: './basket-modal.component.html',
  styleUrls: ['./basket-modal.component.scss']
})
export class BasketModalComponent implements OnInit {
  isLoadingCatalogTable: boolean = false;
  catalogType: boolean = true;
  catalogs: Catalog[] = [];
  userId: string;
  selectedCatalogType: CatalogType;
  catalogFiltrator: WarehouseCatalogFiltrationByType = new WarehouseCatalogFiltrationByType();
  catalogTypeList: CatalogType[] = [];



  //#region Table settings
  settings = {
    mode: 'external',
    actions: false,
    pager: {
      display: false,
    },
    filter: {
      inputClass: 'inherit-height',
    },
    columns: {
      name: {
        title: 'Catalog name',
        type: 'string',
      },
      currentAmount: {
        title: 'Current amount',
        type: 'number',
      },
    },
    noDataMessage: 'Catalogs was not found'
  };
  //#endregion

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private catalogService: CatalogService,
    private basketService: BasketService,
    private modal: NgbActiveModal,
    private catalogTypeService: CatalogTypeService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.getCatalogTypeList();
  }

  onSelectTypeChange() {
    this.catalogFiltrator.catalogTypeId = this.selectedCatalogType.id;
    if (!this.userId) {
      this.catalogFiltrator.basketId = localStorage.getItem('UserBasketId')
      this.getCatalogs(this.catalogFiltrator);
    } else {
      this.catalogFiltrator.userId = this.userId;
      this.getCatalogsByUserId(this.catalogFiltrator);
    }
  }

  private getCatalogTypeList() {
    this.catalogTypeService.getCatalogNameList()
      .pipe(
        finalize(() => {
        }))
      .subscribe(catalogTypeList => {
        this.catalogTypeList = catalogTypeList;
        console.log(this.catalogTypeList);
        this.selectedCatalogType = catalogTypeList[1];
        this.catalogFiltrator.catalogTypeId = catalogTypeList[1].id;
        if (!this.userId) {
          this.catalogFiltrator.basketId = localStorage.getItem('UserBasketId')
          this.getCatalogs(this.catalogFiltrator);
        } else {
          this.catalogFiltrator.userId = this.userId;
          this.getCatalogsByUserId(this.catalogFiltrator);
        }
      }, err => {
        this.toastrService.danger(`Nesanāca dabūt katalogu tipus`);
      });
  }
  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof AddWarehouseModalComponent
   */
  close() {
    this.modal.dismiss();
  }

  /**
     * Method gets list of catalogs
     *
     * @private
     * @memberof WarehouseInfoComponent
     */
  private getCatalogs(catalogFiltrator: WarehouseCatalogFiltrationByType) {
    this.source.empty();

    // Calling method from service that will get uss our catalogs
    this.catalogService.getCatalogsByBasketId(catalogFiltrator)
      .pipe(
        // When method will be executed
        finalize(() => {
          // Loading indicator will be disabled
          this.isLoadingCatalogTable = false;
        }))
      // Subscribing to the method, to get our objects
      .subscribe(catalogs => {
        // When objects will come, we load them in to the our smart table
        this.catalogs = catalogs;

        this.source.load(catalogs);
      });
  }
  private getCatalogsByUserId(catalogFiltrator: WarehouseCatalogFiltrationByType) {
    this.source.empty();
    // Calling method from service that will get uss our catalogs
    this.catalogService.getCatalogByUserId(catalogFiltrator)
      .pipe(
        // When method will be executed
        finalize(() => {
          // Loading indicator will be disabled
          this.isLoadingCatalogTable = false;
        }))
      // Subscribing to the method, to get our objects
      .subscribe(catalogs => {
        this.catalogs = catalogs;

        this.source.load(catalogs);
        // When objects will come, we load them in to the our smart table
      });
  }
}
