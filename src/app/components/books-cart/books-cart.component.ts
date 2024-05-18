import { Component, OnInit, SimpleChanges } from '@angular/core';
import { IBook } from '../../interfaces/book.interface';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BooksCartService } from '../../services/books-cart.service';
import { BooksCartApiService } from '../../services/books-cart-api.service';


@Component({
  selector: 'app-books-cart',
  standalone: true,
  imports: [MatListModule, MatButtonModule],
  templateUrl: './books-cart.component.html',
  styleUrl: './books-cart.component.css'
})
export class BooksCartComponent implements OnInit {
  // @Input("booksList") addedBooksList: IBook[] = [];
  addedBooksList: IBook[] = [];
  //(aqui virá um alias) a string de dentro será usada pra fazer o propery binding

  constructor(
    private booksCartService: BooksCartService, 
    private booksCartApiService: BooksCartApiService
  ){

  }

  ngOnInit(): void {
    const $addedBooksList = this.booksCartApiService.booksList$;
    $addedBooksList.subscribe((addedBooksList) => {
      this.addedBooksList = addedBooksList;
    });

    // this.addedBooksList = this.booksCartApiService.getAllBooks();
    // this.addedBooksList = this.booksCartService.getAllBooks();
  }

  //função do ciclo de vida que é executado toda vez que alguma alteração é feita no componente
  //ngOnChanges só roda se fizer uma modificação
  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log(this.addedBooksList);
  //   //JSON.stringify converte de objeto para string
  //   localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  // }

  incrementTotalBookCopies(book: IBook) {
    this.booksCartApiService.incrementTotalBookCopies(book._id)
    // this.booksCartService.incrementTotalBookCopies(book._id)
    // this.addedBooksList = this.booksCartService.getAllBooks();
  }

  decrementTotalBookCopies(book: IBook) {
    this.booksCartApiService.decrementTotalBookCopies(book._id)
    // this.booksCartService.decrementTotalBookCopies(book._id)
    // this.addedBooksList = this.booksCartService.getAllBooks();
  }
}
