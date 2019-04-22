import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehousesService } from '../../../../services/warehouses.service';
import { Warehouse } from '../../../../models/warehouse.model';
import { News } from '../../../../models/news.mode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewsModalComponent } from './add-news-modal/add-news-modal.component';
import { NewsService } from '../../../../services/news.service';
import { DetailsNewsModalComponent } from './details-news-modal/details-news-modal.component';
import { NbToastrService } from '@nebular/theme';
import { pipe } from '@angular/core/src/render3';
import { finalize } from 'rxjs/operators';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Catalog } from '../../../../models/catalog.model';
import { IncrementDecrementCatalogModalComponent } from './increment-decrement-catalog-modal/increment-decrement-catalog-modal.component';
import { EditCatalogModelComponent } from './edit-catalog-model/edit-catalog-model.component';

@Component({
  selector: 'ngx-warehouse-info',
  templateUrl: './warehouse-info.component.html',
  styleUrls: ['./warehouse-info.component.scss']
})
export class WarehouseInfoComponent implements OnInit {
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
  warehouse: Warehouse
  /**
   * Warehouse news list
   *
   * @type {News[]}
   * @memberof WarehouseInfoComponent
   */
  warehouseNewsList: News[] = [];
  isLoading: boolean = true;
  isLoadingNews: boolean = true;
  toggelingNews: boolean = false;
  testObj: Catalog[] = [];
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
      maximumAmount: {
        title: 'Maximum amount',
        type: 'number',
      },
      minimumAmount: {
        title: 'Minimum amount',
        type: 'number',
      },
      purchasePrice: {
        title: 'Purchase Price',
        type: 'number',
      },
      soldPrice: {
        title: 'Sold Price',
        type: 'number',
      },
      differenceBetweenSoldAndPurchasePrice: {
        title: 'Difference',
        type: 'number',
      },
      shortContent: {
        title: 'Short Content',
        type: 'custom',
        renderComponent: IncrementDecrementCatalogModalComponent
      },
      // isProcessed: {
      //   title: this.translate.instant('FEEDBACK_TABLE.PROCESSED'),
      //   editable: false,
      //   renderComponent: UserFeedbackStatusComponent,
      //   type: 'custom',
      //   filter: {
      //     type: 'list',
      //     config: {
      //       list: [
      //         { value: true, title: this.translate.instant('FEEDBACK.PROCESSED_YES') },
      //         { value: false, title: this.translate.instant('FEEDBACK.PROCESSED_NO') },
      //       ]
      //     },
      //   },
      // },

      //   details:
      //   {
      //     title: 'Actions',
      //     filter: false,
      //     addable: false,
      //     editable: false,
      //     type: 'custom',
      //     renderComponent: UserFeedbackDetailsButtonComponent,
      //   },
    },
    noDataMessage: 'Catalogs was not found'
  };
  //#endregion

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehousesService,
    private modalService: NgbModal,
    private newsService: NewsService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.testObj[0] = new Catalog();
    this.testObj[0].name = 'Snikers';
    this.testObj[0].purchasePrice = 4;
    this.testObj[0].soldPrice = 3;
    this.testObj[0].minimumAmount = 20;
    this.testObj[0].maximumAmount = 50;
    this.testObj[0].currentAmount = 18;
    this.testObj[0].differenceBetweenSoldAndPurchasePrice = 1;
    this.testObj[1] = new Catalog();
    this.testObj[1].name = 'Twiks';
    this.testObj[1].purchasePrice = 8;
    this.testObj[1].soldPrice = 4;
    this.testObj[1].minimumAmount = 10;
    this.testObj[1].maximumAmount = 30;
    this.testObj[1].currentAmount = 8;
    this.testObj[1].differenceBetweenSoldAndPurchasePrice = 4;

    this.source.load(this.testObj);
    // Getting warehouse id from routing
    this.gettingWarehouseIdFormRoute();
    // Getting warehouse by id
    this.getWarehouse();
    // Getting warehouse news list
    this.getWarehouseNewsList();
  }

  toggleQrCodeDownloadButtonVisability() {
    this.downloadButtonVisability = !this.downloadButtonVisability
  }

  // TODO: Write a comments and JSDOCs to all this methods.....

  //#region Convertation base 64 to blob and download file functionality
  downloadQrCode(base64content: string) {
    base64content = base64content.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
    console.log(atob(base64content));
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
            this.toastrService.success(`News was deleted`);
          }, err => {
            this.toastrService.danger(`News was not deleted`);
          })
      } else {
        this.isLoadingNews = false;
        return 0;
      }
    })

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
  toggleNewsFlag(news: News) {
    this.toggelingNews = true;
    this.newsService.toggleNewsFlag(news.id)
      .pipe(finalize(() => {
        this.toggelingNews = false;
      }))
      .subscribe(toggledNews => {
        news = Object.assign(news, toggledNews);
        this.toastrService.success(`Status was changed`);
      }, err => {
        this.toastrService.danger(`Status was not changed`);
      });
  }

  /**
   * Getting id of an warehouse from routing
   *
   * @private
   * @memberof WarehouseInfoComponent
   */
  private gettingWarehouseIdFormRoute() {
    // Getting a route param from our routing.
    this.specificWarehouseId = this.route.snapshot.paramMap.get('id');
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
      });
  }

}
