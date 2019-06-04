import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

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
}
