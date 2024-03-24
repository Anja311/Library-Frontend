import { Injectable } from '@angular/core';
import { Book } from '../shared/models/Book';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectionResponse } from '../shared/models/response/CollectionResponse';
import { BookRequest } from '../shared/models/request/BookRequest';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl: string;
  private selectedBook: Book | null = null;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { 
    this.baseUrl = 'https://localhost:7199/api/Book';
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorage.getFromLocalStorage("token"));
  }

  findAll(): Observable<CollectionResponse<Book>> {
    return this.httpClient.get<CollectionResponse<Book>>(this.baseUrl, {headers: this.headers});
  }

  getById(id : number) : Observable<Book>{
    const url = `${this.baseUrl}?bookId=${id}`;
    return this.httpClient.get<Book>(url, {headers : this.headers});
  }

  addBook(bookRequest: BookRequest): Observable<Book> {
    return this.httpClient.post<Book>(this.baseUrl, bookRequest, {headers: this.headers});
  }

  deleteBook(bookId: number): Observable<void> {
    const url = `${this.baseUrl}?bookId=${bookId}`;
    return this.httpClient.delete<void>(url, {headers: this.headers});
  }

  setSelectedBook(book: Book): void {
    this.selectedBook = book;
  }

  getSelectedBook(): Book | null {
    return this.selectedBook;
  }
}
