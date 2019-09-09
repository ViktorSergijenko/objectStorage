import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { SimpleLog } from '../models/log.model';
import { DateFiltration } from '../models/dateFiltration';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }
  /**
   * Method returns endpoint that is related only to this module
   *
   * @returns {string} Returns full api url with included module
   * @memberof NewsService
   */
  getEndpointUrl(): string {
    return `${environment.apiUrl}simpleLogTable`;
  }

  /**
  * Method gets all logs
  *
  * @returns {Observable<SimpleLog[]>}
  * @memberof WarehousesService
  */
  getAllLogs(filterOptions: DateFiltration): Observable<SimpleLog[]> {
    return this.http.post<SimpleLog[]>(this.getEndpointUrl(), filterOptions);
  }
  /**
  * Method gets all logs
  *
  * @returns {Observable<SimpleLog[]>}
  * @memberof WarehousesService
  */
  getAllAdminLogs(filterOptions: DateFiltration): Observable<SimpleLog[]> {
    return this.http.post<SimpleLog[]>(this.getEndpointUrl() + '/admin', filterOptions);
  }

  filterLogsByDate(filterOptions: DateFiltration): Observable<SimpleLog[]> {
    var tokenHeader = new HttpHeaders();

    return this.http.post<SimpleLog[]>(this.getEndpointUrl() + '/filter', filterOptions, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }
  getMyWarehouseLogs(id: string): Observable<SimpleLog[]> {
    var tokenHeader = new HttpHeaders();
    return this.http.get<SimpleLog[]>(this.getEndpointUrl() + `/onlyMyLogs/${id}`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }
}
