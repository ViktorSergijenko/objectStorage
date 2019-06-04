import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Basket, BasketWithNewProductsVM, IAddProductsToBasket } from '../models/basket.model';
import { Product } from '../models/product.model';
import { Catalog } from '../models/catalog.model';
import { ObjectChange } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private http: HttpClient
  ) { }
  /**
  * Subject to track changes of feedback status update
  *
  * @private
  * @memberof UserFeedBackService
  */
  private catalogSubject = new Subject<ObjectChange<Catalog>>();
  /**
     * Method returns endpoint that is related only to this module
     *
     * @returns {string} Returns full api url with included module
     * @memberof CatalogService
     */
  getEndpointUrl(): string {
    return `${environment.apiUrl}basket`;
  }
  /**
   * Method gets basket from system
   *
   * @param {string} basketId Id of an basket that we want to get
   * @returns {Observable<void>}
   * @memberof CatalogService
   */
  getCatalogByiD(basketId: string): Observable<Basket> {
    return this.http.get<Basket>(`${this.getEndpointUrl()}/${basketId}`);
  }
  /**
   * Method updates user basket
   *
   * @param {Catalog} catalog Catalog object that we want to edit or add
   * @returns {Observable<Catalog>}
   * @memberof CatalogService
   */
  addProductsToBasket(items: IAddProductsToBasket): Observable<Catalog> {
    return this.http.post<Catalog>(this.getEndpointUrl(), items);
  }

  /**
 * Method updates user basket
 *
 * @param {Catalog} catalog Catalog object that we want to edit or add
 * @returns {Observable<Catalog>}
 * @memberof CatalogService
 */
  addProductsToCatalogFromBasket(items: IAddProductsToBasket): Observable<Catalog> {
    return this.http.post<Catalog>(`${this.getEndpointUrl()}/remove-from-basket`, items);
  }
  /**
  * Method send signal to stream with updated information about feedback
  *
  * @template Type Type of updated object (UserFeedback in current case)
  * @param {ObjectChange<Type>} updated Updated feedback object
  * @memberof UserFeedBackService
  */
  setUpdatedCatalog(updated: ObjectChange<Catalog>) {
    this.catalogSubject.next(updated);
  }

  /**
   * Method that gets changes from subject about updated feedback
   *
   * @returns Returns observable with new feedback 
   * @memberof UserFeedBackService
   */
  getUpdatedCatalog() {
    return this.catalogSubject.asObservable();
  }
}
