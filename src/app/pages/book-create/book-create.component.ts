import { Component } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { IBook } from '../../interfaces/book.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BooksCatalogService } from '../../services/books-catalog.service';

@Component({
    selector: 'app-book-create',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './book-create.component.html',
    styleUrl: './book-create.component.css'
})

export class BookCreateComponent{
    booksList: IBook[] = [];
    bookForm: FormGroup;

    //Sempre uma classe for instaciada, irá rodar o construtor, passando o código abaixo ele irá rodar o construtor do service, e assim irá carregar a lista de livros.
    constructor(private booksCatalogService: BooksCatalogService) {
        this.bookForm = new FormGroup({
            title: new FormControl(),
            author: new FormControl(),
            description: new FormControl(),
            pullished_date: new FormControl(),
            price: new FormControl(),
            totalInStock: new FormControl()
        });
    }

    // changeTitleValue(event: Event){
    //   const target =  event.target as HTMLInputElement;
    //   this.newBook.title = target.value;

    // }

    submitForm() {
        // console.log("booksList before push:", this.booksList);
        const newBook: IBook = this.bookForm.value;
        // console.log("newBook:", newBook);
        // this.booksList.push(newBook);
        // localStorage.setItem("booksList", JSON.stringify(this.booksList));
        this.booksCatalogService.createBook(newBook)
        this.bookForm.reset();
    }
}
