import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../shared/models/request/LoginRequest';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'https://localhost:7199/api/Authenticate';
  }

  login(request: LoginRequest): Observable<string> {
    return this.httpClient.post<string>(this.baseUrl, request);
  }
}
