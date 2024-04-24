import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBook } from '../../interfaces/book.interface';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-books-cart',
  standalone: true,
  imports: [MatListModule, MatButtonModule],
  templateUrl: './books-cart.component.html',
  styleUrl: './books-cart.component.css'
})
export class BooksCartComponent implements OnInit, OnChanges {
  @Input("booksList") addedBooksList: IBook[] = [];
  //(aqui virá um alias) a string de dentro será usada pra fazer o propery binding

  ngOnInit() {
    // console.log(this.addedBooksList);
  }

  //função do ciclo de vida que é executado toda vez que alguma alteração é feita no componente
  //ngOnChanges só roda se fizer uma modificação
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.addedBooksList);
    //JSON.stringify converte de objeto para string
    localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  }

  removeBookFromCart(book: IBook) {
    const bookIndex = this.addedBooksList.findIndex((currBook) => {
      return currBook.id === book.id;
    })
    this.addedBooksList.splice(bookIndex, 1);
  }

  incrementTotalBookCopies(book: IBook) {
    book.totalAddedToCart++;
    if (book.totalAddedToCart > book.totalInStock) {
      book.totalAddedToCart = book.totalInStock;
    }
    localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  }
  decrementTotalBookCopies(book: IBook) {
    book.totalAddedToCart--;
    if (book.totalAddedToCart <= 0) {
      this.removeBookFromCart(book);
    }
    localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  }
}
