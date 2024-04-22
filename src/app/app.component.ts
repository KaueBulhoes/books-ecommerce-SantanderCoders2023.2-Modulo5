import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { BooksCatalogComponent } from './pages/books-catalog/books-catalog.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BooksCartComponent } from './components/books-cart/books-cart.component';
import {MatIconModule} from '@angular/material/icon';
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

  addBookToCart(book: IBook){
    this.addedBooksList.push(book);
  }
}
