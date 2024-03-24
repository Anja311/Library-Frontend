export class ReservationRequest{
    idUser!: number;
    idBook!: number;

    constructor(idUser : number, idBook : number){
        this.idBook = idBook;
        this.idUser = idUser;
    }
}