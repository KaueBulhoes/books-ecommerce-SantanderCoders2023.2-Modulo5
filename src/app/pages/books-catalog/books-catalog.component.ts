import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { BookCardComponent } from '../../components/book-card/book-card.component';
import { IBook } from '../../interfaces/book.interface';
import { BooksCatalogService } from '../../services/books-catalog.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books-catalog',
  standalone: true,
  imports: [NgFor, NgIf , BookCardComponent, RouterOutlet],
  templateUrl: './books-catalog.component.html',
  styleUrl: './books-catalog.component.css'
})

export class BooksCatalogComponent implements OnInit{
  // booksList: Array<IBook>
  @Output() addBookToCart: EventEmitter<IBook> = new EventEmitter;
  //O que é passado em <> é o conteúdo que será passado quando emitir o output

  booksList: IBook[] = []

  constructor(private booksCatalogService: BooksCatalogService){  }

  ngOnInit(){
    this.booksList = this.booksCatalogService.booksList();
  }

  warnAboutAddBookToCart(book: IBook){
    // console.log("Opa, clicou no botão de compra"); //2° passo
    // console.log(book);
    this.addBookToCart.emit(book);
  }
}
