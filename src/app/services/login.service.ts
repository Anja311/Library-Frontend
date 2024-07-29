import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../shared/models/request/LoginRequest';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string;

  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();
  

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'https://localhost:7199/api/Authenticate';
  }

  login(request: LoginRequest): Observable<string> {
    this.userSource.next(LoginRequest);
    return this.httpClient.post<string>(this.baseUrl, request);
  }

  logout(){
    this.userSource.next(null);
  }
}
