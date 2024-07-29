import { Component } from '@angular/core';
import { BorrowService } from '../services/borrow.service';
import { BorrowingBookResponse } from '../shared/models/response/BorrowingBookResponse';
import { UserService } from '../services/user.service';
import { ReturnBookRequest } from '../shared/models/request/ReturnBookRequest';
import { User } from '../shared/models/User';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent {

  borrowings: BorrowingBookResponse[] = [];
  selectedBookId: number | null = null;
  username : string | null = null;
  userId : number | null = null;
  user: User | null = null;

  constructor(private borrowService : BorrowService, private userService : UserService, private dialog : MatDialog){
    this.loadData();
  }

  loadData(){
    this.borrowService.findAll().subscribe(
      response => {
        this.borrowings = response;
      },
      error => {
        console.log("Doslo je do greske prilikom dohvatanja podataka: ", error);
      }
    );
  }

  async submitBorrowing() {
    try {
      const response: any = await this.userService.findByUsername(this.username!).toPromise();
      this.user = response;
      console.log("USER: " + this.user?.idUser);
      if (this.user != null && this.selectedBookId != null){
        const request = new ReturnBookRequest();
        request.bookId = this.selectedBookId;
        request.userId = this.user.idUser;

        console.log(request);

        this.borrowService.returnBook(request).subscribe(
          response => {
            if (response.lateReturn)
              this.openPopup("Knjiga uspješno vraćena (sa kašnjenjem)!");
            else
              this.openPopup("Knjiga uspješno vraćena (bez kašnjenja)!");

            console.log('Knjiga uspješno vracena:', response);
            this.username = '';
            this.selectedBookId = null;
            this.loadData();
          },
          error => {
            if (error.error && error.error.errors === 'AlreadyReturned')
              this.openPopup("Knjiga je već vraćena!");
            else
            this.openPopup("Došlo je do greške!");
            console.error('Došlo je do greške prilikom vracanja knjige:', error);
          }
        );
      }
    } catch (error) {
      console.error('Došlo je do greške prilikom dohvaćanja podataka o korisniku:', error);
    }
  }

  openPopup(message: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
      data: { message: message }
    });

    setTimeout(() => {
      dialogRef.close();
    }, 3000); 
  }
}
