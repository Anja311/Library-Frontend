import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../shared/models/Role';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private localStorage : LocalStorageService) { 
    this.baseUrl = 'https://localhost:7199/api/Role';
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.getFromLocalStorage("token"));
  }

  findAll(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.baseUrl, {headers: this.headers});
  }
}
