import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { IBook } from '../../interfaces/book.interface';
import { NgIf } from '@angular/common';
import { BooksCartService } from '../../services/books-cart.service';
import { BooksCartApiService } from '../../services/books-cart-api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgIf, MatCardModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})

//implements é usado para implementar a função dentro do método
export class BookCardComponent implements OnInit {
  // @Input() book ? : IBook;  //com a ? eu digo que essa propriedade pode ser IBook ou undefiened
  // @Output() addBookToCart: EventEmitter<void> = new EventEmitter; //1° passo

  @Input() book?: IBook
  addedBooksList: IBook[] = [];

  constructor(private booksCartService: BooksCartService, private booksCartApiService: BooksCartApiService){

  }

  //É a primeira função executada por trás dos panos em Agnular, usado para instanciar diversas funções
  ngOnInit(){
    // console.log(this.book);
    this.addedBooksList = this.booksCartService.getAllBooks();
  }

  addToShoppingCart(){
    this.booksCartApiService.addOrUpdateBookFromCart(this.book)
    // this.booksCartApiService.addBookToCart(this.book)
    // .subscribe((book) => {
    //   console.log("dsgsedgds")
    // });

    // this.addBookToCart.emit(); //4°Passo

    // this.booksCartService.findOrAddBook(this.book);
    // console.log("Book Added to Cart")
    
    }

}
