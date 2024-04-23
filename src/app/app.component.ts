import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { BooksCatalogComponent } from './pages/books-catalog/books-catalog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BooksCartComponent } from './components/books-cart/books-cart.component';
import { MatIconModule } from '@angular/material/icon';
import { IBook } from './interfaces/book.interface';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BooksCatalogComponent, MatSidenavModule, BooksCartComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "it's me you're looking for";
  addedBooksList: IBook[] = [];

  addBookToCart(book: IBook) {
    console.log("Deu bom, cria! O livro vai ser adicionado ao carrinho")

    findBook(book: IBook){
      for (let i=0; i<this.addedBooksList.length; i++) {
        if (book.id === this.addedBooksList[i].id){
          this.addedBooksList[i].totalAddedToCart++;
          return;
        }
      }
    }
    this.addedBooksList.push(book);
    //... serve para desestruturar o elemento, irá criar um array a partir do array, serve para que o ngOnChanges possa entender a mudança
    this.addedBooksList = [...this.addedBooksList];

    console.log(this.addedBooksList);
  }
}
