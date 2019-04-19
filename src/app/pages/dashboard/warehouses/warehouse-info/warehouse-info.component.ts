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

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehousesService,
    private modalService: NgbModal,
    private newsService: NewsService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
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
