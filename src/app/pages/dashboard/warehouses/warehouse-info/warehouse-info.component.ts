import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehousesService } from '../warehouses.service';
import { Warehouse } from '../../../../models/warehouse.model';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private warehouseService: WarehousesService
  ) { }

  ngOnInit() {
    // Getting warehouse id from routing
    this.gettingWarehouseIdFormRoute();
    // Getting warehouse by id
    this.getWarehouse();
  }

  toggleQrCodeDownloadButtonVisability() {
    this.downloadButtonVisability = !this.downloadButtonVisability
    console.log(this.downloadButtonVisability);
  }

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
   *Method gets specific warehouse by id
   *
   * @private
   * @memberof WarehouseInfoComponent
   */
  private getWarehouse() {
    this.warehouseService.getById(this.specificWarehouseId).subscribe(warehouseThatHasCame => {
      this.warehouse = warehouseThatHasCame;
    });
  }

}
