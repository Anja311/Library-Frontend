import { Book } from "../Book";

export class BorrowingBookResponse{
    idBorrowing!: number;
    idBook!: number;
    idUser!: number;
    idBibliotekar! : number;
    date!: Date;
    returnTo!: Date;
    bookReturned! : boolean;
    dateReturned!: Date | null;
    book!: Book;
}