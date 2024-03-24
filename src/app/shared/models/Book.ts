import { Author } from "./Author";

export class Book{
    idBook!: number;
    title!: string;
    description!: string;
    publicationDate!: Date;
    genre!: string;
    isAvailable!: boolean;
    numOfBorrowing!: number;
    pictureName!: string;
    idAuthor!: number;
    author!: Author;
}