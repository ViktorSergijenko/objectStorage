import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationVM, LoginVM, ProfileInformationVM, ChangePasswordViewModel, UserVM, ChangeUserInfoViewModel } from '../models/user';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ObjectChange } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  /**
  * Subject to track changes of catalog status update
  *
  * @private
  * @memberof BasketService
  */
  private userSubject = new Subject<ObjectChange<UserVM>>();
  private togleUserGetInTable = new Subject<boolean>();


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
    var tokenHeader = new HttpHeaders();

    return this.http.post<RegistrationVM>(`${this.getEndpointUrl()}/register`, newUser, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
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
    var tokenHeader = new HttpHeaders();
    return this.http.get<ProfileInformationVM>(`${environment.apiUrl}userProfile/get-profile`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }

  getUserList(): Observable<UserVM[]> {
    var tokenHeader = new HttpHeaders();

    return this.http.get<UserVM[]>(`${this.getEndpointUrl()}/getUserList`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }

  changeUserPassword(newPassword: ChangePasswordViewModel): Observable<void> {
    var tokenHeader = new HttpHeaders();

    return this.http.post<void>(`${this.getEndpointUrl()}/changeUserPassword`, newPassword, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }
  changeUserInformation(editedUser: ChangeUserInfoViewModel): Observable<ChangeUserInfoViewModel> {
    var tokenHeader = new HttpHeaders();

    return this.http.post<ChangeUserInfoViewModel>(`${this.getEndpointUrl()}/edit-user`, editedUser, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }

  deleteUser(user: UserVM): Observable<void> {
    var tokenHeader = new HttpHeaders();

    return this.http.post<void>(`${this.getEndpointUrl()}/delete`, user, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }
  getRolesList(): Observable<string[]> {
    var tokenHeader = new HttpHeaders();
    return this.http.get<string[]>(`${this.getEndpointUrl()}/getRoleList`, { headers: tokenHeader.set('Authorization', 'Bearer ' + localStorage.getItem('UserToken')) });
  }




  /**
  * Method send signal to stream with updated information about feedback
  *
  * @template Type Type of updated object (UserFeedback in current case)
  * @param {ObjectChange<Type>} updated Updated feedback object
  * @memberof UserFeedBackService
  */
  setUpdatedUser(updated: ObjectChange<UserVM>) {
    this.userSubject.next(updated);
  }

  /**
   * Method that gets changes from subject about updated feedback
   *
   * @returns Returns observable with new feedback 
   * @memberof UserFeedBackService
   */
  getUpdatedUser() {
    return this.userSubject.asObservable();
  }

  /**
* Method send signal to stream with updated information about feedback
*
* @template Type Type of updated object (UserFeedback in current case)
* @param {ObjectChange<Type>} updated Updated feedback object
* @memberof UserFeedBackService
*/
  setUpdatedToggle() {
    this.togleUserGetInTable.next(!this.togleUserGetInTable);
  }

  /**
   * Method that gets changes from subject about updated feedback
   *
   * @returns Returns observable with new feedback 
   * @memberof UserFeedBackService
   */
  getUpdatedToggle() {
    return this.togleUserGetInTable.asObservable();
  }
}
