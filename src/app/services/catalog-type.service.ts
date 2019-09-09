import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { Observable, Subject } from "rxjs";
import { CatalogType } from "../models/catalog-type";
import { ObjectChange } from "../models/base.model";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class CatalogTypeService {
    constructor(
        private http: HttpClient
    ) { }

    /**
    * Subject to track changes of catalog type status update
    *
    * @private
    * @memberof BasketService
    */
    private catalogTypeSubject = new Subject<ObjectChange<CatalogType>>();

    /**
    * Method returns endpoint that is related only to this module
    *
    * @returns {string} Returns full api url with included module
    * @memberof CatalogTypeService
    */
    getEndpointUrl(): string {
        return `${environment.apiUrl}catalogType`;
    }

    /**
     * Method gets catalog type list
     *
     * @returns {Observable<Catalog[]>}
     * @memberof CatalogService
     */
    getCatalogNameList(): Observable<CatalogType[]> {
        var tokenHeader = new HttpHeaders();
        return this.http.get<CatalogType[]>(this.getEndpointUrl(), { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }

    /**
     * Method gets catalog type by id
     *
     * @returns {Observable<Catalog[]>}
     * @memberof CatalogService
     */
    getCatalogTypeById(id: string): Observable<CatalogType> {
        var tokenHeader = new HttpHeaders();
        return this.http.get<CatalogType>(this.getEndpointUrl() + `/${id}`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }

    /**
     * Method adds/edits catalog type
     *
     * @param {CatalogType} catalogType Catalog tyoe that we want to add or edit
     * @returns {Observable<CatalogType>} Observable with CatalogType object
     * @memberof CatalogTypeService
     */
    saveCatalogType(catalogType: CatalogType): Observable<CatalogType> {
        var tokenHeader = new HttpHeaders();
        return this.http.post<CatalogType>(this.getEndpointUrl(), catalogType, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }

    /**
     * Method deletes catalog type 
     *
     * @param {CatalogType} catalogTypeId Catalog type id that we want to delete
     * @returns {Observable<void>} Void
     * @memberof CatalogTypeService
     */
    deleteCatalogType(catalogTypeId: string): Observable<void> {
        var tokenHeader = new HttpHeaders();
        return this.http.delete<void>(`${this.getEndpointUrl()}/${catalogTypeId}`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
    }


    /**
     * Method updates catalog type subject
     *
     * @param {ObjectChange<CatalogType>} updated
     * @memberof CatalogTypeService
     */
    setUpdatedCatalogType(updated: ObjectChange<CatalogType>) {
        this.catalogTypeSubject.next(updated);
    }

    /**
     * Method that gets changes from subject about updated catalog name type
     *
     * @returns Returns observable with new catalog type 
     * @memberof CatalogTypeService
     */
    getUpdatedCatalogType() {
        return this.catalogTypeSubject.asObservable();
    }

}