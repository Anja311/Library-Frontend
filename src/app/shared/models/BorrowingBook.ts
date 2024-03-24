export class BorrowingBook{
    idBook! : number;
    idUser!: number;
    idBibliotekar!: number;

    constructor(idBook: number, idUser: number, idBibliotekar: number){
        this.idUser = idUser;
        this.idBook = idBook;
        this.idBibliotekar = idBibliotekar;
    }
}