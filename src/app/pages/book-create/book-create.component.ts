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
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-book-create',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './book-create.component.html',
    styleUrl: './book-create.component.css'
})

export class BookCreateComponent{
    private bookId: string;
    bookToUpdate?: IBook;
    booksList: IBook[] = [];
    bookForm: FormGroup;

    //Sempre uma classe for instaciada, irá rodar o construtor, passando o código abaixo ele irá rodar o construtor do service, e assim irá carregar a lista de livros.
    constructor(private booksCatalogService: BooksCatalogService, private route: ActivatedRoute) {
        this.bookId = this.route.snapshot.params["id"];

        this.bookToUpdate = this.booksCatalogService.getBookById(this.bookId)

        this.bookForm = new FormGroup({
            title: new FormControl( this.bookToUpdate?.title || "Título Padrão"),
            author: new FormControl(this.bookToUpdate?.author),
            description: new FormControl(this.bookToUpdate?.description),
            pullished_date: new FormControl(this.bookToUpdate?.pullished_date),
            price: new FormControl(this.bookToUpdate?.price),
            totalInStock: new FormControl(this.bookToUpdate?.totalInStock)
        });
        //snapshot vai retornar uma "foto" da rota
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
