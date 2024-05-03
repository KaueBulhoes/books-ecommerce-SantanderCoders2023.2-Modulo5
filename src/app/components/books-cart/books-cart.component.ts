import { Component, OnInit, SimpleChanges } from '@angular/core';
import { IBook } from '../../interfaces/book.interface';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BooksCartService } from '../../services/books-cart.service';



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

  constructor(private booksCartService: BooksCartService){

  }

  ngOnInit(): void {
    this.addedBooksList = this.booksCartService.getAllBooks();
  }

  //função do ciclo de vida que é executado toda vez que alguma alteração é feita no componente
  //ngOnChanges só roda se fizer uma modificação
  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log(this.addedBooksList);
  //   //JSON.stringify converte de objeto para string
  //   localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  // }

  incrementTotalBookCopies(book: IBook) {
    this.booksCartService.incrementTotalBookCopies(book.id)
  }

  decrementTotalBookCopies(book: IBook) {
    this.booksCartService.decrementTotalBookCopies(book.id)
  }
}
