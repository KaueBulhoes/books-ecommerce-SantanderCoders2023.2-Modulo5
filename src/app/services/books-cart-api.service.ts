import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksCartApiService {

API_URL: string = "https://crudcrud.com/api/f549db9d35a1489c8a32d8a6e22a9c8a/cart";

  constructor(private http: HttpClient) { }

  getAllBooks(){
    return this.http.get<IBook[]>(this.API_URL);
  }

  createBook(book?: IBook){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(this.API_URL, book, { headers });
  }
}
