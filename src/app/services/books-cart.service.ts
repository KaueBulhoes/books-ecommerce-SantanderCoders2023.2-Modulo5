import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksCartService {

  addedBooksList: IBook[] = [];

  constructor() { 
    this.addedBooksList = this.getAllBooks();
  }

getAllBooks(){
  return JSON.parse(localStorage.getItem("addedBooksList") || "[]");
}

findBookIndexByID(bookID: Number){
  const bookIndex = this.addedBooksList.findIndex((currBook) => {
    return currBook.id === bookID;
  });

  return bookIndex;
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

  localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
}

removeBookFromCart(bookID: Number) {
  const bookIndex =  this.findBookIndexByID(bookID)
  this.addedBooksList.splice(bookIndex, 1);
}

incrementTotalBookCopies(bookID: Number) {
  const bookIndex =  this.findBookIndexByID(bookID);
  const book = this.addedBooksList[bookIndex]

  book.totalAddedToCart++;

  if (book.totalAddedToCart > book.totalInStock) {
    book.totalAddedToCart = book.totalInStock;
  }

  localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
}

decrementTotalBookCopies(bookID: Number) {
  const bookIndex =  this.findBookIndexByID(bookID);
  const book = this.addedBooksList[bookIndex]

  book.totalAddedToCart--;

  if (book.totalAddedToCart <= 0) {
    this.removeBookFromCart(bookID);
  }
  
  localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
}

}
