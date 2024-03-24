import { Component } from '@angular/core';
import { BorrowService } from '../services/borrow.service';
import { BorrowingBookResponse } from '../shared/models/response/BorrowingBookResponse';
import { GetBorrowingsRequest } from '../shared/models/request/GetBorrowingsRequest';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent {

  userId!: number | null; 
  borrowings: BorrowingBookResponse[] = [];

  constructor(private borrowService: BorrowService, private route: ActivatedRoute, private bookService : BookService){ 
    this.loadData();
  }

  loadData() {
    const userIdParam = this.route.snapshot.queryParams['userId'];
    this.userId = userIdParam ? +userIdParam : null;
    const request = new GetBorrowingsRequest(this.userId, null, null);
    this.borrowService.findByUserId(request).subscribe(
      response => {
        this.borrowings = response.collection;
      },
      error => {
        console.log("Doslo je do greske prilikom dohvatanja podataka: ", error);
      }
    );
  }
}
