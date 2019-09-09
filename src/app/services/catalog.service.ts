import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Catalog } from '../models/catalog.model';
import { environment } from '../../environments/environment.prod';
import { CatalogName } from '../models/catalog-name.model';
import { FilterSorting, WarehouseCatalogFiltrationByType } from '../models/filter-sort.model';
import { Warehouse } from '../models/warehouse.model';

@Injectable({
    providedIn: 'root'
})

export class CatalogService {
    constructor(
        private http: HttpClient
    ) { }
    /**
     * Subject to track changes of add ore remove status(add or remove products from catalog manually/using basket)
     *
     * @private
     * @memberof UserFeedBackService
     */
    private addOrRemoveStatus = new Subject<boolean>();

    /**
    * Method returns endpoint that is related only to this module
    *
    * @returns {string} Returns full api url with included module
    * @memberof CatalogService
    */
    getEndpointUrl(): string {
        return `${environment.apiUrl}catalog`;
    }

    /**
     * Method gets catalog list
     *
     * @returns {Observable<Catalog[]>}
     * @memberof CatalogService
     */
    getCatalogList(): Observable<Catalog[]> {
        return this.http.get<Catalog[]>(this.getEndpointUrl());
    }

    /**
     * Method gets catalog name list
     *
     * @returns {Observable<Catalog[]>}
     * @memberof CatalogService
     */
    getCatalogNameList(id: string): Observable<CatalogName[]> {
        return this.http.get<CatalogName[]>(this.getEndpointUrl() + 'Name/' + id);
    }
    /**
     * Method adds or updates catalog
     *
     * @param {Catalog} catalog Catalog object that we want to edit or add
     * @returns {Observable<Catalog>}
     * @memberof CatalogService
     */
    addOrUpdate(catalog: Catalog): Observable<Catalog> {
        var tokenHeader = new HttpHeaders();

        return this.http.post<Catalog>(this.getEndpointUrl(), catalog, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }
    /**
     * Method deletes catalog from system
     *
     * @param {string} catalogId Id of an catalog that we want to delete
     * @returns {Observable<void>}
     * @memberof CatalogService
     */
    removeCatalog(catalogId: string): Observable<void> {
        var tokenHeader = new HttpHeaders();
        return this.http.delete<void>(`${this.getEndpointUrl()}/${catalogId}`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }

    /**
     * Method deletes catalog from system
     *
     * @param {string} catalogId Id of an catalog that we want to delete
     * @returns {Observable<void>}
     * @memberof CatalogService
     */
    getCatalogByiD(catalogId: string): Observable<Catalog> {
        return this.http.get<Catalog>(`${this.getEndpointUrl()}/${catalogId}`);
    }

    /**
     * Method gets list of catalogs of an specifick warehouse
     *
     * @param {string} warehouseId Id of an warehouse that catalogs we want to get
     * @returns {Observable<void>}
     * @memberof CatalogService
     */
    getCatalogsByWarehouseId(filterCatalogInWarehouse: WarehouseCatalogFiltrationByType): Observable<Catalog[]> {
        return this.http.post<Catalog[]>(`${this.getEndpointUrl()}/warehouse`, filterCatalogInWarehouse);
    }
    /**
     * Method gets list of catalogs of an specifick basket
     *
     * @param {string} basketId Id of an basket that catalogs we want to get
     * @returns {Observable<void>}
     * @memberof CatalogService
     */
    getCatalogsByBasketId(catalogFiltrator: WarehouseCatalogFiltrationByType): Observable<Catalog[]> {
        return this.http.post<Catalog[]>(`${this.getEndpointUrl()}/basket`, catalogFiltrator);
    }
    /**
    * Method gets basket from system
    *
    * @param {string} basketId Id of an basket that we want to get
    * @returns {Observable<void>}
    * @memberof CatalogService
    */
    getCatalogByUserId(filterCatalogInWarehouse: WarehouseCatalogFiltrationByType): Observable<Catalog[]> {

        return this.http.post<Catalog[]>(`${this.getEndpointUrl()}/basket-user-id`, filterCatalogInWarehouse);
    }
    /**
    * Method send signal to stream with updated information about feedback
    *
    * @template Type Type of updated object (UserFeedback in current case)
    * @param {ObjectChange<Type>} updated Updated feedback object
    * @memberof UserFeedBackService
    */
    setAddOrRemoveStatus(updated: boolean) {
        this.addOrRemoveStatus.next(updated);
    }
    /**
     * Method that send request to get filtered  catalog name list
     *
     * @param {string} filterOption filtered option by that filtering will be done
     * @returns {Observable<Warehouse[]>} Returns `Observable` with warehouse list `Warehouse[]`
     * @memberof WarehousesService
     */
    getFilteredCatalogName(filterSortingOption: FilterSorting): Observable<CatalogName[]> {
        return this.http.post<CatalogName[]>(`${this.getEndpointUrl()}Name/filteredCatalogName`, filterSortingOption);
    }
    /**
     * Method that gets changes from subject about updated feedback
     *
     * @returns Returns observable with new feedback 
     * @memberof UserFeedBackService
     */
    getUpdatedAddOrRemoveStatus() {
        return this.addOrRemoveStatus.asObservable();
    }


    /**
     * Method adds or updates catalog name
     *
     * @param {Catalog} catalog Catalog object that we want to edit or add
     * @returns {Observable<Catalog>}
     * @memberof CatalogService
     */
    addOrUpdateCatalogName(catalogName: CatalogName): Observable<CatalogName> {
        var tokenHeader = new HttpHeaders();

        return this.http.post<CatalogName>(this.getEndpointUrl() + 'Name', catalogName, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }

    /**
    * Method adds or updates catalog name
    *
    * @param {Catalog} catalog Catalog object that we want to edit or add
    * @returns {Observable<Catalog>}
    * @memberof CatalogService
    */
    deleteCatalogName(id: string): Observable<CatalogName> {
        var tokenHeader = new HttpHeaders();

        return this.http.delete<CatalogName>(this.getEndpointUrl() + 'Name/' + id, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }

    /**
     * Method gets all warehouses that stores catalogs with specific name
     *
     * @param {string} catalogNameId
     * @returns {Observable<Warehouse[]>} Returns list with warehouses
     * @memberof CatalogService
     */
    getWarehousesThatHaveCatalogsWithSpecificName(catalogNameId: string): Observable<Warehouse[]> {
        var tokenHeader = new HttpHeaders();

        return this.http.get<Warehouse[]>(this.getEndpointUrl() + 'Name/warehouses/' + catalogNameId, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }

}