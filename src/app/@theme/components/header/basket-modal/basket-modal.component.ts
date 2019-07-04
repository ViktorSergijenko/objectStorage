import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CatalogService } from '../../../../services/catalog.service';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../../services/basket.service';
import { Catalog } from '../../../../models/catalog.model';

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
  //#region Table settings
  settings = {
    mode: 'external',
    actions: false,
    pager: {
      perPage: 10
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
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (!this.userId) {
      this.getCatalogs(localStorage.getItem('UserBasketId'));
    } else {
      this.getCatalogsByUserId(this.userId);
    }
  }
  /**
   * Method closes (dismisses) current modal windows
   *
   * @memberof AddWarehouseModalComponent
   */
  close() {
    this.modal.dismiss();
  }
  catalogTypeShowToggle() {
    this.catalogType = !this.catalogType
    if (this.catalogType) {
      var filteredCatalog = this.catalogs.filter(x => x.type !== false);
      this.source.empty();
      this.source.load(filteredCatalog);

    } else {
      var filteredCatalog = this.catalogs.filter(x => x.type !== true);
      this.source.empty();
      this.source.load(filteredCatalog);
    }
  }
  /**
     * Method gets list of catalogs
     *
     * @private
     * @memberof WarehouseInfoComponent
     */
  private getCatalogs(id: string) {
    // Calling method from service that will get uss our catalogs
    this.catalogService.getCatalogsByBasketId(id)
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
        var filteredCatalog = this.catalogs.filter(x => x.type === true);

        this.source.load(filteredCatalog);
      });
  }
  private getCatalogsByUserId(id: string) {
    // Calling method from service that will get uss our catalogs
    this.catalogService.getCatalogByUserId(id)
      .pipe(
        // When method will be executed
        finalize(() => {
          // Loading indicator will be disabled
          this.isLoadingCatalogTable = false;
        }))
      // Subscribing to the method, to get our objects
      .subscribe(catalogs => {
        this.catalogs = catalogs;
        var filteredCatalog = this.catalogs.filter(x => x.type !== true);

        this.source.load(filteredCatalog);
        // When objects will come, we load them in to the our smart table
      });
  }
}
