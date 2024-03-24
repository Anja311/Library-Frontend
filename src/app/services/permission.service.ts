import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '../shared/models/Permission';
import { Observable } from 'rxjs/internal/Observable';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private localStorage : LocalStorageService) { 
    this.baseUrl = 'https://localhost:7199/api/Permission/';
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.getFromLocalStorage("token"));
  }

  findMissingPermissions(roleId: number): Observable<Permission[]> {
    const url = `${this.baseUrl}Missing/?roleId=${roleId}`;
    console.log("URL: " + url);
    return this.httpClient.get<Permission[]>(url, {headers: this.headers});
  }

  addPermissionToRole(roleId: number, permissionId : number) : Observable<Permission>{
    const url = `${this.baseUrl}?roleId=${roleId}&permissionId=${permissionId}`;
    return this.httpClient.post<Permission>(url, {headers: this.headers})
  }

  deletePermissionToRole(roleId: number, permissionId: number): Observable<void>{
    const url = `${this.baseUrl}?roleId=${roleId}&permissionId=${permissionId}`;
    return this.httpClient.delete<void>(url, {headers: this.headers});
  }
}
