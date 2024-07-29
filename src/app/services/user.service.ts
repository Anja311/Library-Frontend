import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionResponse } from '../shared/models/response/CollectionResponse';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../shared/models/User';
import { UserRequest } from '../shared/models/request/UserRequest';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private localStorage : LocalStorageService) { 
    this.baseUrl = 'https://localhost:7199/api/User';
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.getFromLocalStorage("token"));
  }

  findAll(): Observable<CollectionResponse<User>> {
    return this.httpClient.get<CollectionResponse<User>>(this.baseUrl, {headers: this.headers});
  }

  create(userRequest: UserRequest): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, userRequest, {headers: this.headers});
  }

  delete(userId: number): Observable<void> {
    const url = `${this.baseUrl}?userId=${userId}`;
    return this.httpClient.delete<void>(url, {headers: this.headers});
  }

  findByUsername(username: string): Observable<User> {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.getFromLocalStorage("token"));
    const url = `${this.baseUrl}/${username}`;
    return this.httpClient.get<User>(url, {headers: this.headers});
  }
}
