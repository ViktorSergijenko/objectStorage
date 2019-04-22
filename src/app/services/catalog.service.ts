import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Catalog } from '../models/catalog.model';
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


}