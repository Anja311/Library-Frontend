import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/Book';
import { BookService } from '../services/book.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { ReservationService } from '../services/reservation.service';
import { ReservationRequest } from '../shared/models/request/ReservationRequest';
import { User } from '../shared/models/User';
import { PopupComponent } from '../popup/popup.component';
import { ReservationResponse } from '../shared/models/response/ReservationResponse';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{

  successMessage: string = '';
  errorMessage: string = '';

  picturePath: string = "http://localhost:8080/";
  book: Book | null = null;
  user: User | null = null;
  userHasReservation: boolean = false;
  reservations: ReservationResponse[] = [];
  reservation: ReservationResponse | undefined = undefined;

  constructor(private bookService: BookService, private lsService: LocalStorageService, private dialog : MatDialog,
    private reservationService : ReservationService) {
    this.user = lsService.getFromLocalStorage("user");

    reservationService.getByUserId(this.user?.idUser!).subscribe(
      response =>{
        this.reservations = response;
        this.userHasReservation = this.reservations.some(reservation => reservation.book.idBook === this.book?.idBook && !reservation.isBorrowed)
        
        this.reservation = this.reservations.find(reservation => reservation.book.idBook === this.book?.idBook && !reservation.isBorrowed)
      },
      error =>{
        console.log("Greska prilikom ucitavanja podataka.");
      }
    )
   
  }
  ngOnInit(): void {
    this.book = this.lsService.getFromLocalStorage("book");
  }

  deleteBook() {
    if (this.book != null)
    {
      this.bookService.deleteBook(this.book.idBook).subscribe(
        response => {
          this.successMessage = 'Knjiga je uspješno obrisana!';
        },
        error => {
          this.errorMessage = 'Došlo je do greške.';
        }
      );
    } 
  }

  deleteReservation() {
    this.reservationService.deleteReservation(this.reservation?.idReservation!).subscribe(
      response => {
        this.userHasReservation = false;
        this.openPopup("Rezervacija je uspješno otkazana!");
      },
      error =>{
        console.log("Doslo je do greske prilikom brisanja rezervacije!");
        this.openPopup("Greška prilikom otkazivanja rezervacije!!");
      }
    );
  }
    
  editBook() {
  }

  reserveBook() {

    if (this.user != null && this.book != null){
    const request = new ReservationRequest(this.user?.idUser, this.book?.idBook);

    this.reservationService.create(request).subscribe(
      response => {
        console.log('Knjiga uspješno rezervisana:', response);
        this.openPopup("Uspješno ste rezervisali knjigu! Dobićete objavještenje kada knjiga bude dostupna!");
      },
      error => {
        if (error.error && error.error.errors === 'AlreadyBorrowed'){
          console.log("Vec ste rezervisali");
          this.openPopup("Već ste rezervisali ovu knjigu!");
        }
        console.log('Došlo je do greške prilikom rezervisanja knjige:', error);
      }
    );
  }
}

  borrowBook() {
    this.openDialog();
  
    if (this.book){
      this.book.isAvailable = false;
      this.lsService.addToLocalStorage("book", this.book);
    }
  }  

  openDialog(): void {
    if (this.book !== null) {
      const dialogRef = this.dialog.open(BookDialogComponent, {
        data: { book: this.book },
        width: '400px' 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dijalog je zatvoren');
      });
    }
  }

  openPopup(message: string): void {
    this.dialog.open(PopupComponent, {
      width: '250px',
      data: { message: message }
    });
  }
}
