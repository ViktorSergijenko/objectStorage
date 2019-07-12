import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, NewsResolveDTO } from '../models/news.mode';
import { environment } from '../../environments/environment.prod';
import { NewsComment } from '../models/newsComment';



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
   * @memberof NewsService
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
   * Get specific warehouse news
   *
   * @param {string} warehouseId Warehouse id that news we want to get
   * @returns {Observable<News[]>} Returns `Observable` with `News[]`
   * @memberof NewsService
   */
  getByWarehouseIdForTable(warehouseId: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.getEndpointUrl()}/table/${warehouseId}`);
  }

  /**
  * Method that send request to add new news to system or modifie it
  *
  * @param {RentalPointDTO} news News  to add or modifie
  * @returns {Observable<RentalPointVM>} Returns `Observable` with new/modified `News`
  * @memberof NewsService
  */
  addOrUpdate(news: News): Observable<News> {
    var tokenHeader = new HttpHeaders();
    return this.http.post<News>(this.getEndpointUrl(), news, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }

  /**
   * Toggles news flag
   *
   * @param {string} newsId Id of an news that we want to toggle
   * @returns {Observable<News>} Returns `Observable` with `News`
   * @memberof NewsService
   */
  toggleNewsFlag(news: NewsResolveDTO): Observable<News> {
    var tokenHeader = new HttpHeaders();

    return this.http.post<News>(`${this.getEndpointUrl()}/fix-news`, news, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) })
  }
  /**
   * Toggles news flag
   *
   * @param {string} newsId Id of an news that we want to toggle
   * @returns {Observable<News>} Returns `Observable` with `News`
   * @memberof NewsService
   */
  addCommentForNews(news: NewsComment): Observable<void> {
    var tokenHeader = new HttpHeaders();

    return this.http.post<void>(`${this.getEndpointUrl()}/add-comment`, news, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) })
  }
  /**
   * Toggles news flag
   *
   * @param {string} newsId Id of an news that we want to toggle
   * @returns {Observable<News>} Returns `Observable` with `News`
   * @memberof NewsService
   */
  getCommentForNews(newsId: string): Observable<NewsComment[]> {
    var tokenHeader = new HttpHeaders();

    return this.http.get<NewsComment[]>(`${this.getEndpointUrl()}/comments/${newsId}`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) })
  }
  /**
  * Method removes news from system
  *
  * @param {string} newsId news id to remove
  * @returns {Observable<void>} Returns empty `Observable` as succesful result
  * @memberof NewsService
  */
  removeNews(newsId: string): Observable<void> {
    var tokenHeader = new HttpHeaders();

    return this.http.delete<void>(`${this.getEndpointUrl()}/${newsId}`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }

}
