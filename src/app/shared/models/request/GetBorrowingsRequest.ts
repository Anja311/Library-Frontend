export class GetBorrowingsRequest {
    userId: number | null;
    bookId: number | null;
    date: Date | null;

    constructor(userId: number | null, bookId: number | null, date: Date | null) {
        this.userId = userId;
        this.bookId = bookId;
        this.date = date;
    }
}