import { Component } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { IBook } from '../../interfaces/book.interface';
import { BooksCatalogService } from '../../services/books-catalog.service';

@Component({
    selector: 'app-book-create',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './book-create.component.html',
    styleUrl: './book-create.component.css'
})

export class BookCreateComponent {
    private bookId: string;
    bookToUpdate?: IBook;
    booksList: IBook[] = [];
    bookForm: FormGroup;

    //Sempre uma classe for instaciada, irá rodar o construtor, passando o código abaixo ele irá rodar o construtor do service, e assim irá carregar a lista de livros.
    constructor(
        private booksCatalogService: BooksCatalogService, 
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.bookId = this.route.snapshot.params["id"];
        // this.route.params.subscribe((params: Params) => {
        //   console.log(params);
        // });

        this.bookToUpdate = this.booksCatalogService.getBookById(this.bookId)

        this.bookForm = new FormGroup({
            title: new FormControl(this.bookToUpdate?.title || "Título Padrão"),
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
        let bookData: IBook = this.bookForm.value;

        if (this.bookId) {
            bookData = {...bookData, _id: this.bookId}
            this.booksCatalogService.updateBook(bookData);
            this.router.navigate(['/'])
            return;
        }

        this.router.navigate(['/'])
        this.booksCatalogService.createBook(bookData);
        this.bookForm.reset();
    }
}
