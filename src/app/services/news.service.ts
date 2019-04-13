import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Warehouse } from '../models/warehouse.model';
import { News } from '../models/news.mode';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Method returns endpoint that is related only to this module
   *
   * @returns {string} Returns full api url with included module
   * @memberof WarehousesService
   */
  getEndpointUrl(): string {
    return `${environment.apiUrl}news`;
  }


  /**
   * Get specific warehouse news
   *
   * @param {string} warehouseId Warehouse id that news we want to get
   * @returns {Observable<News[]>} Returns `Observable` with `News[]`
   * @memberof NewsService
   */
  getByWarehouseId(warehouseId: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.getEndpointUrl()}/${warehouseId}`);
  }

  /**
  * Method that send request to add new news to system or modifie it
  *
  * @param {RentalPointDTO} news News  to add or modifie
  * @returns {Observable<RentalPointVM>} Returns `Observable` with new/modified `News`
  * @memberof NewsService
  */
  addOrUpdate(news: News): Observable<News> {
    return this.http.post<News>(this.getEndpointUrl(), news);
  }

  /**
   * Toggles news flag
   *
   * @param {string} newsId Id of an news that we want to toggle
   * @returns {Observable<News>} Returns `Observable` with `News`
   * @memberof NewsService
   */
  toggleNewsFlag(newsId: string): Observable<News> {
    return this.http.get<News>(`${this.getEndpointUrl()}/fix-news/${newsId}`)
  }

}
