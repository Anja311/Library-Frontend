import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationResponse } from '../shared/models/response/ReservationResponse';
import { BookService } from '../services/book.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent {

  userId!: number | null; 
  reservations: ReservationResponse[] = [];

  constructor(private route: ActivatedRoute, private bookService : BookService, private reservationService : ReservationService){
    this.loadData();
  }

  loadData(){
    const userIdParam = this.route.snapshot.queryParams['userId'];
    this.userId = userIdParam ? +userIdParam : null;

    this.reservationService.getByUserId(this.userId!).subscribe(
      response => {
        this.reservations = response;
        console.log(this.reservations);
      },
      error => {
        console.log("Doslo je do greske prilikom dohvatanja podataka: ", error);
      }
    );
  }
}
