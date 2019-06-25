import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from '../../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  /**
   * Variable that will contain one of Id's of an catalog,that will come with params from route.
   * @type {string}
   * @memberof ProductTableComponent
   */
  specifickCatalogId: string = '';
  isLoading = true;

  /**
   * Ng2 smart table settings.
   * @memberof HouseTableComponent
   */
  settings = {
    mode: 'external',
    actions: false,
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      pricePerOne: {
        title: 'Price',
        type: 'number',
      },
      vendorCode: {
        title: 'Vendor code',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.gettingWarehouseIdFormRoute();
    this.getProducts();

  }

  getProducts() {
    this.productService.getProductsByCatalogId(this.specifickCatalogId)
      .pipe(
        // When method will be executed
        finalize(() => {
          // Loading indicator will be disabled
          this.isLoading = false;
        }))
      .subscribe(products => {
        console.log(products);
        // When objects will come, we load them in to the our smart table
        this.source.load(products);
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
    this.specifickCatalogId = this.route.snapshot.paramMap.get('id');
  }

}
