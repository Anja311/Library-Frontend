import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/Book';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit{

    p: number = 1;
  
    picturePath: string = "http://localhost:8080/";
    books: Book[] = [];
    numOfBooks = 0;
    userLoaded: boolean = false;
    userLoading: boolean = false; 
  
    constructor(private bookService: BookService, private lsService : LocalStorageService, private userService : UserService,
      private router: Router)
    {
    }
  
    ngOnInit(): void {
      this.loadUserIfNeeded();
      this.loadData();
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
  
    loadUserIfNeeded() {
      var username = this.lsService.getFromLocalStorage("username");
      if (username !== null && this.lsService.getFromLocalStorage("user") === null){
        this.userLoading = true;
        this.userService.findByUsername(username!).subscribe(
          response => {
            console.log("USER: ", response);
            this.lsService.addToLocalStorage("user", response);
            this.userLoaded = true;
            this.userLoading = false;
          }
        );
      } else {
        this.userLoaded = true; 

        this.userService.findByUsername(username!).subscribe(
          response => {
            console.log("USER: ", response);
            this.lsService.addToLocalStorage("user", response);
          }
        );
      }

      if (this.userLoaded){
        this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
      }
    }
  
    onSelectBook(book: Book): void {
      this.lsService.addToLocalStorage("book", book);
      this.bookService.setSelectedBook(book);
    }
  
  
}
