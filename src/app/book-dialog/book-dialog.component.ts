import { MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';
import { BorrowingBook} from '../shared/models/BorrowingBook';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrowService } from '../services/borrow.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})

export class BookDialogComponent implements OnInit{

  user : User | null = null;
  username : string = '';
  bibliotekarId : number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(public dialogRef: MatDialogRef<BookDialogComponent>, private userService: UserService,
     @Inject(MAT_DIALOG_DATA) public data: any, private borrowService: BorrowService) {}

  ngOnInit(): void {
    console.log('Received book:', this.data.book);
    const closeButton = document.getElementById('closeButton');
    const dialog = document.getElementById('myDialog');

    if (closeButton && dialog) {
      closeButton.addEventListener('click', function() {
        dialog.style.display = 'none';
      });
    } else {
      console.error('One or more elements not found.');
    }
  }

  async onAdd(): Promise<void> {
    try {
      const response: any = await this.userService.findByUsername(this.username).toPromise();
      this.user = response;

      if (this.user != null && this.bibliotekarId != null){
        const borrowBook = new BorrowingBook(this.data.book.idBook, this.user.idUser, this.bibliotekarId);
        this.borrowService.create(borrowBook).subscribe(
          response => {
            this.successMessage = 'Dodato!';
            console.log('Knjiga uspješno dodana:', response);
            this.username = '';
            this.bibliotekarId = null;
          },
          error => {
            this.errorMessage = 'Došlo je do greške prilikom dodavanja knjige';
            console.error('Došlo je do greške prilikom dodavanja knjige:', error);
          }
        );


      }

    } catch (error) {
      console.error('Došlo je do greške prilikom dohvaćanja podataka:', error);
    }
}

  onClose() {
    this.dialogRef.close();
  }

}
