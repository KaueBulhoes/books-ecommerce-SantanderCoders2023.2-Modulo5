import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { IBook } from '../../interfaces/book.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgIf, MatCardModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})

//implements é usado para implementar a função dentro do método
export class BookCardComponent implements OnInit {
  @Input() book ? : IBook;  //com a ? eu digo que essa propriedade pode ser IBook ou undefiened
  @Output() addBookToCart: EventEmitter<void> = new EventEmitter; //1° passo

  addedBooksList: IBook[] = [];

  // constructor(){
  //   //console.log(this.book); //resultado será undefined
  //   //para fazer o console.log não pode fazer dentro do construtor
  // }

  //É a primeira função executada por trás dos panos em Agnular, usado para instanciar diversas funções
  ngOnInit(){
    // console.log(this.book);
    this.addedBooksList = JSON.parse(localStorage.getItem("addedBooksList") || "[]");
  }

  findOrAddBook(book?: IBook) {
    for (let i = 0; i < this.addedBooksList.length; i++) {
      if (book?.id === this.addedBooksList[i].id) {
        this.addedBooksList[i].totalAddedToCart++;
        return;
      }
    }

    if(book) {
      book.totalAddedToCart = 1;
      this.addedBooksList.push(book);
    }
  }

  addToShoppingCart(){
    this.addBookToCart.emit(); //4°Passo
    // console.log("Book Added to Cart")
    this.findOrAddBook(this.book)
    
    localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  }

}
