import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Warehouse } from '../../../models/warehouse.model';
import { FilterSorting } from '../../../models/filter-sort.model';


@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  constructor(private http: HttpClient) { }

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
    return this.http.get<Warehouse[]>(this.getEndpointUrl());
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
    return this.http.post<Warehouse>(this.getEndpointUrl(), warehouse);
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
    return this.http.delete<void>(`${this.getEndpointUrl()}/${warehouseId}`);
  }
}
