import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SimpleLog } from '../models/log.model';

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
  getAllLogs(): Observable<SimpleLog[]> {
    return this.http.get<SimpleLog[]>(this.getEndpointUrl());
  }
  /**
  * Method gets all logs
  *
  * @returns {Observable<SimpleLog[]>}
  * @memberof WarehousesService
  */
  getAllAdminLogs(): Observable<SimpleLog[]> {
    return this.http.get<SimpleLog[]>(this.getEndpointUrl() + '/admin');
  }
}
