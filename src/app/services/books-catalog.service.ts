import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/book.interface';
import { v4 as uuidv4} from 'uuid';


@Injectable({
  //Quer dizer que na raiz o BooksCatalogService está sendo providenciado
  providedIn: 'root'
})

export class BooksCatalogService {

  //Services são a ponte entre o componente de renderização e a persistência de dados
  //Dessa form, traremos tudo de manipulação de array do BooksCatalog para cá
  constructor() {
    //Quando era adicionado um livro novo, o novo livro sobrescrevia. Foi adicionado a linha abaixo para puxar a lista sempre.
    this.booksList = this.getAllBooks();
  }

  booksList: IBook[] = [];

  getAllBooks() {
    return JSON.parse(localStorage.getItem("booksList") || "[]");
  }

  getBookById(bookId: string){
    return this.booksList.find((b) => b._id == bookId);
  }

  createBook(book: IBook) {
    book._id = uuidv4();
    this.booksList.push(book);
    localStorage.setItem("booksList", JSON.stringify(this.booksList));
  }

  updateBook(book: IBook){
    const index = this.booksList.findIndex((b) => b._id == book._id);
    this.booksList[index] = book;
    localStorage.setItem("booksList", JSON.stringify(this.booksList));
  }

  deleteBook(bookId: string) {
    const index = this.booksList.findIndex((b) => b._id == bookId);
    this.booksList.splice(index, 1);
    localStorage.setItem("booksList", JSON.stringify(this.booksList));
  }

}
