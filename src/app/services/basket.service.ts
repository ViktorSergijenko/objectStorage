import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable, Subject } from 'rxjs';
import { Basket, IAddProductsToBasket } from '../models/basket.model';
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
  * Subject to track changes of catalog status update
  *
  * @private
  * @memberof BasketService
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
    var tokenHeader = new HttpHeaders();

    return this.http.post<Catalog>(this.getEndpointUrl(), items, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }

  /**
 * Method updates user basket
 *
 * @param {Catalog} catalog Catalog object that we want to edit or add
 * @returns {Observable<Catalog>}
 * @memberof CatalogService
 */
  addProductsToCatalogFromBasket(items: IAddProductsToBasket): Observable<Catalog> {
    var tokenHeader = new HttpHeaders();

    return this.http.post<Catalog>(`${this.getEndpointUrl()}/remove-from-basket`, items, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
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
