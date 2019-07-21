import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Warehouse, UserWarehouse } from '../models/warehouse.model';
import { FilterSorting } from '../models/filter-sort.model';
import { News } from '../models/news.mode';
import { environment } from '../../environments/environment';
import { ObjectChange } from '../models/base.model';
import { UserVM } from '../models/user';






@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  constructor(private http: HttpClient) { }
  /**
  * Subject to track changes of catalog status update
  *
  * @private
  * @memberof BasketService
  */
  private warehouseSubject = new Subject<ObjectChange<Warehouse>>();

  /**
   * Method returns endpoint that is related only to this module
   *
   * @returns {string} Returns full api url with included module
   * @memberof WarehousesService
   */
  getEndpointUrl(): string {
    return `${environment.apiUrl}warehouse`;
  }

  /**
   * Method gets all warehouses
   *
   * @returns {Observable<Warehouse[]>}
   * @memberof WarehousesService
   */
  getAllWarehouses(): Observable<Warehouse[]> {
    var tokenHeader = new HttpHeaders();

    return this.http.get<Warehouse[]>(this.getEndpointUrl(), { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }
  /**
   * Method gets warehouse  by ID
   *
   * @param {string} warehouseId ID of warehouse to get
   * @returns {Observable<Warehouse>} Returns `Observable` with `Warehouse`
   * @memberof WarehousesService
   */
  getById(warehouseId: string): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.getEndpointUrl()}/${warehouseId}`);
  }

  /**
   * Method that send request to add new warehouse to system or modifie it
   *
   * @param {RentalPointDTO} warehouse Warehouse  to add or modifie
   * @returns {Observable<RentalPointVM>} Returns `Observable` with new/modified `Warehouse`
   * @memberof WarehousesService
   */
  addOrUpdate(warehouse: Warehouse): Observable<Warehouse> {
    var tokenHeader = new HttpHeaders();
    return this.http.post<Warehouse>(this.getEndpointUrl(), warehouse, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }
  /**
   * Method that send request to get filtered  warehouse list
   *
   * @param {string} filterOption filtered option by that filtering will be done
   * @returns {Observable<Warehouse[]>} Returns `Observable` with warehouse list `Warehouse[]`
   * @memberof WarehousesService
   */
  getFilteredWarehouses(filterSortingOption: FilterSorting): Observable<Warehouse[]> {
    return this.http.post<Warehouse[]>(`${this.getEndpointUrl()}/filteredWarehouse`, filterSortingOption);
  }
  /**
   * Method removes Warehouse from system
   *
   * @param {string} WarehouseId Warehouse to remove
   * @returns {Observable<void>} Returns empty `Observable` as succesful result
   * @memberof HousesService
   */
  removeWarehouse(warehouseId: string): Observable<void> {
    var tokenHeader = new HttpHeaders();

    return this.http.delete<void>(`${this.getEndpointUrl()}/${warehouseId}`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }

  /**
   * Method gets warehouse news
   *
   * @param {string} warehouseId Id of an warehouse that news we want to get
   * @returns {Observable<News[]>} Returns `Observable` with warehouse news list `News[]`
   * @memberof WarehousesService
   */
  getWarehouseNews(warehouseId: string): Observable<News[]> {
    return this.http.post<News[]>(`${this.getEndpointUrl()}/warehouse-news`, warehouseId);
  }

  getUsersThatAllowToUseWarehouse(userWarehouse: UserWarehouse): Observable<UserVM[]> {
    var tokenHeader = new HttpHeaders();
    return this.http.post<UserVM[]>(`${this.getEndpointUrl()}/warehouse-employees`, userWarehouse, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) })
  }
  addUserToUseWarehouse(userWarehouse: UserWarehouse): Observable<UserVM> {
    var tokenHeader = new HttpHeaders();
    return this.http.post<UserVM>(`${this.getEndpointUrl()}/add-user-to-warehouse`, userWarehouse, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) })
  }

  toggleAmountSeeAbility(userWarehouse: UserWarehouse): Observable<void> {
    var tokenHeader = new HttpHeaders();
    return this.http.post<void>(`${this.getEndpointUrl()}/toggle-amount`, userWarehouse, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) })
  }
  removeUserFromWarehouse(userWarehouse: UserWarehouse): Observable<UserVM> {
    var tokenHeader = new HttpHeaders();
    return this.http.post<UserVM>(`${this.getEndpointUrl()}/remove-from-warehouse`, userWarehouse, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) })
  }

  getUserWarehouse(userWarehouse: UserWarehouse): Observable<UserWarehouse> {
    var tokenHeader = new HttpHeaders();
    return this.http.post<UserWarehouse>(`${this.getEndpointUrl()}/user-warehouse`, userWarehouse, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) })
  }
  setUpdatedWarehouse(updated: ObjectChange<Warehouse>) {
    this.warehouseSubject.next(updated);
  }

  /**
   * Method that gets changes from subject about updated feedback
   *
   * @returns Returns observable with new feedback 
   * @memberof UserFeedBackService
   */
  getUpdatedWarehouse() {
    return this.warehouseSubject.asObservable();
  }
}
