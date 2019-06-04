import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Catalog } from '../models/catalog.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CatalogService {
    constructor(
        private http: HttpClient
    ) { }

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
     * Method adds or updates catalog
     *
     * @param {Catalog} catalog Catalog object that we want to edit or add
     * @returns {Observable<Catalog>}
     * @memberof CatalogService
     */
    addOrUpdate(catalog: Catalog): Observable<Catalog> {
        return this.http.post<Catalog>(this.getEndpointUrl(), catalog);
    }
    /**
     * Method deletes catalog from system
     *
     * @param {string} catalogId Id of an catalog that we want to delete
     * @returns {Observable<void>}
     * @memberof CatalogService
     */
    removeCatalog(catalogId: string): Observable<void> {
        return this.http.delete<void>(`${this.getEndpointUrl()}/${catalogId}`);
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
    getCatalogsByWarehouseId(warehouseId: string): Observable<Catalog[]> {
        return this.http.get<Catalog[]>(`${this.getEndpointUrl()}/warehouse/${warehouseId}`);
    }
    /**
     * Method gets list of catalogs of an specifick basket
     *
     * @param {string} basketId Id of an basket that catalogs we want to get
     * @returns {Observable<void>}
     * @memberof CatalogService
     */
    getCatalogsByBasketId(basketId: string): Observable<Catalog[]> {
        return this.http.get<Catalog[]>(`${this.getEndpointUrl()}/basket/${basketId}`);
    }



}