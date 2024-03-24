import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorResponse } from '../shared/models/response/AuthorResponse';
import { Observable } from 'rxjs';
import { AuthorRequest } from '../shared/models/request/AuthorRequest';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private localStorage : LocalStorageService) { 
    this.baseUrl = 'https://localhost:7199/api/Author';
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.getFromLocalStorage("token"));
  }

  findAll(): Observable<AuthorResponse[]> {
    return this.httpClient.get<AuthorResponse[]>('https://localhost:7199/api/Author', {headers: this.headers});
  }

  createAuthor(authorRequest: AuthorRequest): Observable<AuthorResponse> {
    return this.httpClient.post<AuthorResponse>(this.baseUrl, authorRequest, {headers: this.headers});
  }
  
}
