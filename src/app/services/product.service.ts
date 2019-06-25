import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Catalog } from '../models/catalog.model';
import { IAddProductsToBasket } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }
  /**
  * Method returns endpoint that is related only to this module
  *
  * @returns {string} Returns full api url with included module
  * @memberof ProductService
  */
  getEndpointUrl(): string {
    return `${environment.apiUrl}product`;
  }
  /**
   * Method gets list of products of an specifick catalog
   *
   * @param {string} warehouseId Id of an catalog that products we want to get
   * @returns {Observable<Product[]>}
   * @memberof ProductService
   */
  getProductsByCatalogId(catalogId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.getEndpointUrl()}/catalog/${catalogId}`);
  }

  /**
   * Method updates user basket
   *
   * @param {Catalog} catalog Catalog object that we want to edit or add
   * @returns {Observable<Catalog>}
   * @memberof CatalogService
   */
  addProductsToCatalogManually(items: IAddProductsToBasket): Observable<Catalog> {
    var tokenHeader = new HttpHeaders();
    return this.http.post<Catalog>(environment.apiUrl + "catalog/addProductsManually", items, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }

  /**
 * Method updates user basket
 *
 * @param {Catalog} catalog Catalog object that we want to edit or add
 * @returns {Observable<Catalog>}
 * @memberof CatalogService
 */
  removeProductsFromCatalogManually(items: IAddProductsToBasket): Observable<Catalog> {
    var tokenHeader = new HttpHeaders();

    return this.http.post<Catalog>(environment.apiUrl + "catalog/removeProductsManually", items, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }
}
