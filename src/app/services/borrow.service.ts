import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BorrowingBook } from '../shared/models/BorrowingBook';
import { Observable } from 'rxjs/internal/Observable';
import { LocalStorageService } from './local-storage.service';
import { GetBorrowingsRequest } from '../shared/models/request/GetBorrowingsRequest';
import { BorrowingBookResponse } from '../shared/models/response/BorrowingBookResponse';
import { CollectionResponse } from '../shared/models/response/CollectionResponse';
import { ReturnBookRequest } from '../shared/models/request/ReturnBookRequest';
import { ReturnBookResponse } from '../shared/models/response/ReturnBookResponse';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { 
    this.baseUrl = 'https://localhost:7199/api/Borrowing';
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.getFromLocalStorage("token"));
  }

  create(request: BorrowingBook): Observable<BorrowingBook> {
    return this.httpClient.post<BorrowingBook>(this.baseUrl, request, {headers: this.headers});
  }

  findByUserId(request: GetBorrowingsRequest): Observable<CollectionResponse<BorrowingBookResponse>> {
    const url = `${this.baseUrl}?userId=${request.userId}`;
    return this.httpClient.get<CollectionResponse<BorrowingBookResponse>>(url, {headers: this.headers });
  }

  findAll() : Observable<BorrowingBookResponse[]>{
    const url = this.baseUrl + "/Open";
    return this.httpClient.get<BorrowingBookResponse[]>(url, {headers : this.headers});
  }

  returnBook(request: ReturnBookRequest) : Observable<ReturnBookResponse>{
    const url = this.baseUrl + "/Return";
    return this.httpClient.post<ReturnBookResponse>(url, request, {headers : this.headers});
  }
}
