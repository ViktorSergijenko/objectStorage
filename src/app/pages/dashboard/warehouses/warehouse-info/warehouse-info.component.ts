import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehousesService } from '../../../../services/warehouses.service';
import { Warehouse, UserWarehouse } from '../../../../models/warehouse.model';
import { News, NewsResolveDTO } from '../../../../models/news.mode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewsModalComponent } from './add-news-modal/add-news-modal.component';
import { NewsService } from '../../../../services/news.service';
import { DetailsNewsModalComponent } from './details-news-modal/details-news-modal.component';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Catalog } from '../../../../models/catalog.model';
import { IncrementDecrementCatalogModalComponent } from './increment-decrement-catalog-modal/increment-decrement-catalog-modal.component';
import { EditCatalogModelComponent } from './edit-catalog-model/edit-catalog-model.component';
import { CatalogService } from '../../../../services/catalog.service';
import { AddNewCatalogModalComponent } from './add-new-catalog-modal/add-new-catalog-modal.component';
import { EditCatalogModalComponent } from './edit-catalog-modal/edit-catalog-modal.component';
import { Subscription } from 'rxjs';
import { BasketService } from '../../../../services/basket.service';
import { CatalogName } from '../../../../models/catalog-name.model';
import { ResolveProblemModalComponent } from './resolve-problem-modal/resolve-problem-modal.component';
import { WarehouseEmployeesModalComponent } from './warehouse-employees-modal/warehouse-employees-modal.component';
import { CatalogTypeService } from '../../../../services/catalog-type.service';
import { CatalogType } from '../../../../models/catalog-type';
import { WarehouseCatalogFiltrationByType } from '../../../../models/filter-sort.model';

@Component({
  selector: 'ngx-warehouse-info',
  templateUrl: './warehouse-info.component.html',
  styleUrls: ['./warehouse-info.component.scss']
})
export class WarehouseInfoComponent implements OnInit {
  addingObjectToCatalogFromBasket: boolean = true;
  /**
   * Subscription that monitors for catalog updates. Used to track changes for catalog values
   *
   * @type {Subscription}
   * @memberof UserFeedbackListComponent
   */
  catalogUpdate: Subscription;
  /**
   * Flag that toggles download QR code button visability
   *
   * @type {boolean}
   * @memberof WarehouseInfoComponent
   */
  downloadButtonVisability: boolean = false;
  /**
   * Variable that will contain one of Id's of an warehouse,that will come with params from route.
   * @type {string}
   * @memberof WarehouseInfoComponent
   */
  specificWarehouseId: string = '';
  /**
   * Variable that stores specific warehouse
   *
   * @type {Warehouse}
   * @memberof WarehouseInfoComponent
   */
  warehouse: Warehouse;
  hasAbilityToLoad: string;
  /**
   * Varialbe that stores all catalogs that are located in warehouse
   *
   * @type {Catalog}
   * @memberof WarehouseInfoComponent
   */
  catalogList: Catalog[] = [];
  /**
   * Warehouse news list
   *
   * @type {News[]}
   * @memberof WarehouseInfoComponent
   */
  warehouseNewsList: News[] = [];
  userWarehouse: UserWarehouse = new UserWarehouse();
  selectedCatalogType: CatalogType;

  trueString: string = 'true';
  isLoading: boolean = true;
  isLoadingNews: boolean = true;
  isLoadingCatalogTable: boolean = false;
  toggelingNews: boolean = false;
  testObj: Catalog[] = [];
  userRole: string;
  regularUserRole: string = 'Level four';
  catalogNameList: CatalogName[] = [];
  catalogType: boolean = true;
  catalogs: Catalog[] = [];
  catalogTypeList: CatalogType[] = [];
  catalogFiltrator: WarehouseCatalogFiltrationByType = new WarehouseCatalogFiltrationByType();


  //#region Table settings
  settingsForManagersWithAccess = {
    actions: { columnTitle: 'Darbības' },

    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      create: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    pager: {
      display: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    filter: {
      inputClass: 'inherit-height',
    },
    columns: {
      name: {
        title: 'Catalog nosaukums',
        type: 'string',
      },
      currentAmount: {
        title: 'Daudzums',
        type: 'number',
      },
      shortContent: {
        title: 'Izmainit daudzumu',
        type: 'custom',
        renderComponent: IncrementDecrementCatalogModalComponent
      },
    },
    noDataMessage: 'Informācija netika atrasta.'
  };
  settingsForManagersWithNoAccess = {
    actions: { columnTitle: 'Darbības' },

    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      create: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    pager: {
      display: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    filter: {
      inputClass: 'inherit-height',
    },
    columns: {
      name: {
        title: 'Catalog nosaukums',
        type: 'string',
      },
      shortContent: {
        title: 'Izmainit daudzumu',
        type: 'custom',
        renderComponent: IncrementDecrementCatalogModalComponent
      },
    },
    noDataMessage: 'Informācija netika atrasta.'
  };

  settingsForRegularUsersThatCanSeeAmount = {
    mode: 'external',
    actions: false,
    filter: {
      inputClass: 'inherit-height',
    },
    pager: {
      display: false,
    },
    columns: {
      name: {
        title: 'Catalog nosaukums',
        type: 'string',
      },
      currentAmount: {
        title: 'Daudzums',
        type: 'number',
      },
      shortContent: {
        title: 'Izmainit daudzumu',
        type: 'custom',
        renderComponent: IncrementDecrementCatalogModalComponent
      },
    },
    noDataMessage: 'Informācija netika atrasta.'
  };

  settingsForRegularUsersThatCantSeeamount = {
    mode: 'external',
    actions: false,
    filter: {
      inputClass: 'inherit-height',
    },
    pager: {
      display: false,
    },
    columns: {
      name: {
        title: 'Catalog nosaukums',
        type: 'string',
      },
      shortContent: {
        title: 'Izmainit daudzumu',
        type: 'custom',
        renderComponent: IncrementDecrementCatalogModalComponent
      },
    },
    noDataMessage: 'Informācija netika atrasta.'
  };
  //#endregion

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private warehouseService: WarehousesService,
    private modalService: NgbModal,
    private newsService: NewsService,
    private toastrService: NbToastrService,
    private catalogService: CatalogService,
    private basketService: BasketService,
    private catalogTypeService: CatalogTypeService

  ) {
    this.userRole = localStorage.getItem('Role');
    this.hasAbilityToLoad = localStorage.getItem('AbilityToLoad');
    this.userWarehouse.warehouseId = this.route.snapshot.paramMap.get('id');
    this.userWarehouse.userId = localStorage.getItem('UserId');

  }

  ngOnInit() {

    if (this.hasAbilityToLoad === this.trueString) {
    }
    this.catalogUpdate = this.basketService.getUpdatedCatalog()
      .subscribe(update => {
        this.source.update(update.old, update.new)
      });
    // Getting warehouse id from routing
    this.gettingWarehouseIdFormRoute();
    this.getingUserWarehouseInfo();
    this.getCatalogTypeList();
    // Getting warehouse by id
    this.getWarehouse();
    // Getting warehouse news list
    this.getWarehouseNewsList();
    // this.getCatalogNameList();
  }

  onSelectTypeChange() {
    this.getCatalogs();
  }
  ngOnDestroy() {
    // Unsubscribe from catalog update Subscription
    this.catalogUpdate.unsubscribe();
  }
  private getCatalogTypeList() {
    this.catalogTypeService.getCatalogNameList()
      .pipe(
        finalize(() => {
        }))
      .subscribe(catalogTypeList => {
        this.catalogTypeList = catalogTypeList;
        this.selectedCatalogType = catalogTypeList[1];
        this.catalogFiltrator.catalogTypeId = catalogTypeList[1].id;
        this.getCatalogs();
      }, err => {
        this.toastrService.danger(`Nesanāca dabūt katalogu tipus`);
      });
  }

  getingUserWarehouseInfo() {
    this.warehouseService.getUserWarehouse(this.userWarehouse).subscribe(userWarehouseInfo => {
      this.userWarehouse.doesUserHaveAbilityToSeeProductAmount = userWarehouseInfo.doesUserHaveAbilityToSeeProductAmount;
    })
  }
  openEmployeesModal() {
    // Opening modal window where we can add new Warehouse
    const activeModal = this.modalService.open(WarehouseEmployeesModalComponent, {
      size: 'lg',
      container: 'nb-layout',
    });
    activeModal.componentInstance.userWarehouse = this.userWarehouse;
  }

  // getCatalogNameList() {
  //   this.catalogService.getCatalogNameList()
  //     .subscribe(catalogNameList => {
  //       this.catalogNameList = catalogNameList;
  //     });
  // }


  // TODO: Write a comments and JSDOCs to all this methods.....

  //#region Convertation base 64 to blob and download file functionality
  downloadQrCode(base64content: string) {
    base64content = base64content.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
    const blob1 = this.convertBase64ToBlobData(base64content);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blob1, 'qrCode');
    } else { // chrome
      const blob = new Blob([blob1], { type: blob1.type });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrCode';
      link.click();
    }

  }


  convertBase64ToBlobData(base64Data: string, contentType: string = 'image/png', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  //#endregion Convertation base 64 to blob and download file functionality

  /**
   * Method opens modal window with form to add a news
   *
   * @memberof WarehouseInfoComponent
   */
  openAddNewsModal() {
    // Opening modal window where we can edit Warehouse
    const activeModal = this.modalService.open(AddNewsModalComponent, {
      container: 'nb-layout',
    });

    activeModal.componentInstance.warehouseId = this.specificWarehouseId;
    // When modal window was closed it can pass data back to uss...
    activeModal.result.then(newNews => {
      // Getting data that has came back from modal window and pushing it to the list
      this.warehouseNewsList.push(newNews);
    })
  }
  goToAdditionalInformationPage(idForRoute: string) {
    // Navigating user to details page
    this.router.navigate([`/pages/warehouse/details/news/${idForRoute}`]);
  }

  goToWarehouseLogs() {
    // Navigating user to details page
    this.router.navigate([`/pages/warehouse/logs/${this.warehouse.id}`]);
  }
  changeAddingToCatalogProductsMethod() {
    this.addingObjectToCatalogFromBasket = !this.addingObjectToCatalogFromBasket
    this.catalogService.setAddOrRemoveStatus(this.addingObjectToCatalogFromBasket);
  }

  /**
   * Method opens modal window with form to add new catalog in warehouse
   *
   * @memberof WarehouseInfoComponent
   */
  openAddCatalogModal() {
    // Opening modal window where we can add new catalog
    const activeModal = this.modalService.open(AddNewCatalogModalComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.catalogTypeId = this.catalogFiltrator.catalogTypeId;
    activeModal.componentInstance.warehouseId = this.specificWarehouseId;
    activeModal.componentInstance.catalogNameList = this.catalogNameList;
    // When modal window was closed it can pass data back to uss...
    activeModal.result.then(newCatalog => {
      // Push new warehouse to the warehouse list that is used to display them 
      this.source.append(newCatalog);
    })
  }

  openEditCatalogModal(event): void {

    const activeModal = this.modalService.open(EditCatalogModalComponent, {
      container: 'nb-layout',
    });
    // Passing object that we want to edit to the modal window...
    // Using 'Object.assign' to avoid issues, when we changing warehouse values in input, and it is instantly changed in display list too
    // Thx to 'Object.assign' in the modal window, we are working with a copie of selected media file, not with origin
    activeModal.componentInstance.catalogToEdit = Object.assign({}, event.data);
    activeModal.result.then(editedCatalog => {
      this.source.update(event.data, editedCatalog);
    });
  }
  /**
   * Method deletes news form system
   *
   * @param {News} selectedNews
   * @memberof WarehouseInfoComponent
   */
  deleteNew(selectedNews: News) {
    this.isLoadingNews = true;
    const activeModal = this.modalService.open(DeleteModalComponent, {
      container: 'nb-layout',
    });
    activeModal.componentInstance.objectName = 'News';
    activeModal.result.then(res => {
      if (res) {
        this.newsService.removeNews(selectedNews.id)
          .pipe(
            finalize(() => {
              this.isLoadingNews = false;
            })
          )
          .subscribe(() => {
            this.warehouseNewsList = this.warehouseNewsList.filter(news => news !== selectedNews)
            this.toastrService.success(`Problema bija nodzēsta`);
          }, err => {
            this.toastrService.danger(`Problema nebija nodzēsta`);
          })
      } else {
        this.isLoadingNews = false;
        return 0;
      }
    })
  }
  deleteCatalog(event) {
    if (event.data.currentAmount > 0) {
      this.toastrService.danger(`Cataloga vel ir produkti`);

    } else {
      this.isLoadingCatalogTable = true;
      const activeModal = this.modalService.open(DeleteModalComponent, {
        container: 'nb-layout',
      });
      activeModal.componentInstance.objectName = `catalog: ${event.data.name}`;
      activeModal.result.then(res => {
        if (res) {
          this.catalogService.removeCatalog(event.data.id)
            .pipe(
              finalize(() => {
                this.isLoadingCatalogTable = false;
              })
            )
            .subscribe(() => {
              this.source.remove(event.data);
              this.toastrService.success(`Catalog ${event.data.name} bija nodzēsts`);
            }, err => {
              this.toastrService.danger(`Catalog ${event.data.name} nebija nodzēsts`);
            })
        }
      });
    }
  }

  /**
   * Method opens modal window with news detailed information
   *
   * @param {News} newsThatWeWantToWatch
   * @memberof WarehouseInfoComponent
   */
  openDetailsNewsModal(newsThatWeWantToWatch: News) {
    // Opening modal window where we can edit Warehouse
    const activeModal = this.modalService.open(DetailsNewsModalComponent, {
      size: 'lg',
      container: 'nb-layout',
    });
    // Passing information to modal window
    activeModal.componentInstance.news = newsThatWeWantToWatch;
  }
  /**
   * Method toggles news flag
   *
   * @param {News} news
   * @memberof WarehouseInfoComponent
   */
  openCommentModal(news: News) {
    // Opening modal window where we can edit Warehouse
    const activeModal = this.modalService.open(ResolveProblemModalComponent, {
      size: 'lg',
      container: 'nb-layout',
    });
    // Passing information to modal window
    activeModal.componentInstance.news = news;
  }
  toggleNewsFlag(news: News) {
    // Opening modal window where we can edit Warehouse
    this.newsService.toggleNewsFlag(news).subscribe(editedCatalog => {
      var index = this.warehouseNewsList.findIndex(x => x.id == editedCatalog.id);
      this.warehouseNewsList[index] = editedCatalog;
    });
  }
  onUserRowSelect(event): void {
    this.catalogService.setAddOrRemoveStatus(this.addingObjectToCatalogFromBasket);
  }

  /**
   * Getting id of an warehouse from routing
   *
   * @private
   * @memberof WarehouseInfoComponent
   */
  private gettingWarehouseIdFormRoute() {
    console.log('warehouse id');

    // Getting a route param from our routing.
    this.specificWarehouseId = this.route.snapshot.paramMap.get('id');
    this.catalogFiltrator.warehouseId = this.route.snapshot.paramMap.get('id');
  }
  /**
   * Method gets news list for warehouse
   *
   * @private
   * @memberof WarehouseInfoComponent
   */
  private getWarehouseNewsList() {
    this.newsService.getByWarehouseId(this.specificWarehouseId)
      .pipe(finalize(() => {
        this.isLoadingNews = false;
      }))
      .subscribe(newsList => {
        this.warehouseNewsList = newsList;
      });
  }


  /**
   *Method gets specific warehouse by id
   *
   * @private
   * @memberof WarehouseInfoComponent
   */
  private getWarehouse() {

    this.warehouseService.getById(this.specificWarehouseId)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(warehouseThatHasCame => {
        this.warehouse = warehouseThatHasCame;
        this.userWarehouse.userId = localStorage.getItem("UserId");
        this.userWarehouse.warehouseId = this.specificWarehouseId;
      });
  }

  /**
   * Method gets list of catalogs
   *
   * @private
   * @memberof WarehouseInfoComponent
   */
  private getCatalogs() {

    // Calling method from service that will get uss our catalogs
    this.catalogService.getCatalogsByWarehouseId(this.catalogFiltrator)
      .pipe(
        // When method will be executed
        finalize(() => {
          // Loading indicator will be disabled
          this.isLoading = false;
        }))
      // Subscribing to the method, to get our objects
      .subscribe(catalogs => {
        this.catalogs = [];
        this.source.empty();
        this.catalogs = catalogs;
        this.source.load(catalogs);
      });
  }

}
