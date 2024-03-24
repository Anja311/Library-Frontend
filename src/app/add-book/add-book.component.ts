import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Book } from '../shared/models/Book';
import { BookService } from '../services/book.service';
import { Author } from '../shared/models/Author';
import { BookRequest } from '../shared/models/request/BookRequest';
import { AuthorService } from '../services/author.service';
import { AuthorResponse } from '../shared/models/response/AuthorResponse';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  book: Book = {
    title: '',
    description: '',
    publicationDate: new Date(),
    genre: '',
    idAuthor: 0,
    pictureName: '',
    idBook: 0,
    isAvailable: false,
    numOfBorrowing: 0,
    author: new Author()
  };
  selectedPicture: File | null = null;

  authors: AuthorResponse[] = [];

  authorFormControl = new FormControl();
  filteredAuthors: Observable<any[]> = new Observable<any[]>();
  selectedAuthor = new AuthorResponse();
  
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private bookService: BookService, private authorService: AuthorService) {
    this.filteredAuthors = this.authorFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this.filterAuthors(value))
    );
   }

  ngOnInit(): void {
    this.loadAuthors();
  }

  async loadAuthors() {
    try {
      const response: any = await this.authorService.findAll().toPromise();
      this.authors = response.collection;
    } catch (error) {
      console.log('Došlo je do greške prilikom dohvaćanja podataka:', error);
    }
  }

  onSubmit(form: NgForm): void {
    console.log(this.selectedAuthor?.name);
    if (form.valid && this.selectedPicture) {
      const bookRequest: BookRequest = {
        title: this.book.title,
        description: this.book.description,
        publicationDate: this.book.publicationDate,
        genre: this.book.genre,
        idAuthor: this.selectedAuthor?.idAuthor,
        pictureName: this.selectedPicture.name
      };

      this.bookService.addBook(bookRequest).subscribe(
        response => {
          this.successMessage = 'Knjiga je uspješno dodata!';
          console.log('Knjiga uspješno dodana:', response);
          form.resetForm();
        },
        error => {
          this.errorMessage = 'Došlo je do greške prilikom dodavanja knjige';
          console.error('Došlo je do greške prilikom dodavanja knjige:', error);
        }
      );
    } else {
      console.error('Forma nije ispravno popunjena ili slika nije odabrana.');
    }
  }

  onFileSelected(event: any): void {
    this.selectedPicture = event.target.files[0];
  }

  filterAuthors(value: string): Observable<AuthorResponse[]> {
    const filterValue = value.toLowerCase();
    return this.authorService.findAll().pipe(
      map(authors => authors.filter(author => author.name.toLowerCase().includes(filterValue)))
    );
  }
}
