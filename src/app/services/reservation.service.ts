import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ReservationRequest } from '../shared/models/request/ReservationRequest';
import { ReservationResponse } from '../shared/models/response/ReservationResponse';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private localStorage : LocalStorageService) { 
    this.baseUrl = 'https://localhost:7199/api/Reservation';
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.getFromLocalStorage("token"));
  }

  create(request: ReservationRequest): Observable<ReservationResponse> {
    return this.httpClient.post<ReservationResponse>(this.baseUrl, request, {headers: this.headers});
  }

  getByUserId(userId : number) : Observable<ReservationResponse[]>{
    const url = `${this.baseUrl}?userId=${userId}`;
    return this.httpClient.get<ReservationResponse[]>(url, {headers : this.headers});
  }
}
