import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/Book';
import { BookService } from '../services/book.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  p: number = 1;

  picturePath: string = "http://localhost:8080/";
  books: Book[] = [];
  numOfBooks = 0;

  constructor(private bookService: BookService, private lsService : LocalStorageService){
    this.loadData();
  }

  ngOnInit(): void {
    
  }

  async loadData() {
    try {
      const response: any = await this.bookService.findAll().toPromise();
      this.books = response.collection;
      this.numOfBooks = response.total;
    } catch (error) {
      console.error('Došlo je do greške prilikom dohvaćanja podataka:', error);
    }
  }

  onSelectBook(book: Book): void {
    this.lsService.addToLocalStorage("book", book);
    this.bookService.setSelectedBook(book);
  }
}
