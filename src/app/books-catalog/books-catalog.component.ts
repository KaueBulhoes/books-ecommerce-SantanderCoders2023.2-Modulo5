import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { IBook } from '../models/book.interface';

@Component({
  selector: 'app-books-catalog',
  standalone: true,
  imports: [ NgFor,NgIf , MatCardModule],
  templateUrl: './books-catalog.component.html',
  styleUrl: './books-catalog.component.css'
})
export class BooksCatalogComponent {
  booksList: IBook[] = [
    // {
    //   "id":1,
    //   "title": "O Silêncio dos Inocentes",
    //   "author": "Thomas Harris",
    //   "description": "Um livro muito legal...",
    //   "pullished_date": "1988-08-29",
    //   "price": 59.99
    // },
    // {
    //   "id":2,
    //   "title": "Harry Potter e a Ordem da Fênix",
    //   "author": "J.K Rowling",
    //   "description": "Um livro muito legal...",
    //   "pullished_date": "1988-08-29",
    //   "price": 59.99
    // },
    // {
    //   "id":3,
    //   "title": "Jogo dos Tronos",
    //   "author": "Gergoe R.R. Martin",
    //   "description": "Um livro muito legal...",
    //   "pullished_date": "1988-08-29",
    //   "price": 59.99
    // },
    // {
    //   "id":4,
    //   "title": "Hábitos Atômicos",
    //   "author": "James Clear",
    //   "description": "Um livro muito legal...",
    //   "pullished_date": "1988-08-29",
    //   "price": 59.99
    // }
  ]
}
