import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationVM, LoginVM, ProfileInformationVM } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }
  /**
   * Method returns endpoint that is related only to this module
   *
   * @returns {string} Returns full api url with included module
   * @memberof AccountService
   */
  getEndpointUrl(): string {
    return `${environment.apiUrl}account`;
  }

  /**
  * Method that send request to add new user to system 
  *
  * @param {RegistrationVM} newUser User to add 
  * @returns {Observable<RegistrationVM>} Returns `Observable` with new `User`
  * @memberof AccountService
  */
  addUser(newUser: RegistrationVM): Observable<RegistrationVM> {
    return this.http.post<RegistrationVM>(`${this.getEndpointUrl()}/register`, newUser);
  }
  /**
  * Method that send request to login user
  *
  * @param {LoginVM} userToLogin User information to login 
  * @returns {Observable<LoginVM>} Returns `Observable` with new `User`
  * @memberof AccountService
  */
  login(userToLogin: LoginVM): Observable<LoginVM> {
    return this.http.post<LoginVM>(`${this.getEndpointUrl()}/login`, userToLogin);
  }
  getUserProfile(): Observable<ProfileInformationVM> {
    console.log(localStorage.getItem('UserToken'));
    var tokenHeader = new HttpHeaders();
    return this.http.get<ProfileInformationVM>(`${environment.apiUrl}userProfile/get-profile`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }
}
