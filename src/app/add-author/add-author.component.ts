import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorService } from '../services/author.service';
import { AuthorRequest } from '../shared/models/request/AuthorRequest';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent {
  author: AuthorRequest = {
    name: '',
    dateOfBirth: new Date(),
    placeOfBirth: '',
    description: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authorService: AuthorService) { }

  onSubmit(authorForm: NgForm): void {
    if (authorForm.valid) {
      this.authorService.createAuthor(this.author).subscribe(
        response => {
          console.log('Autor uspješno kreiran:', response);
          this.successMessage = 'Autor je uspješno dodat!';
          authorForm.resetForm();
        },
        error => {
          console.error('Došlo je do greške prilikom kreiranja autora:', error);
          this.errorMessage = 'Došlo je do greške prilikom dodavanja autora';
        }
      );
    } else {
      console.error('Forma nije ispravno popunjena.');
    }
  }
}
