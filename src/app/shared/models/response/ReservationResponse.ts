import { Book } from "../Book";

export class ReservationResponse{
    idReservation!: number;
    idUser!: number;
    idBook!: number;
    date!: Date;
    book!: Book;
    isBorrowed!: boolean
}