import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/book.interface';


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

  booksList: IBook[] = []

  getAllBooks() {
    return JSON.parse(localStorage.getItem("booksList") || "[]");
  }

  createBook(book: IBook) {
    this.booksList.push(book);
    localStorage.setItem("booksList", JSON.stringify(this.booksList));
  }

}
