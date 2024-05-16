import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/book.interface';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksCartApiService {
  //Esse é o cara que avisa sobre as mudanças na api
  private booksSubject = new BehaviorSubject<IBook[]>([]);
  //Estou dizendo que booksList$ é observável
  booksList$ = this.booksSubject.asObservable();
  API_URL: string = "https://crudcrud.com/api/ae30e21eacf44153b513f374a77fe0ef/cart";

  constructor(private http: HttpClient) {
    this.getAllBooks();
  }

  getAllBooks() {
    return this.http.get<IBook[]>(this.API_URL).subscribe((books: IBook[]) => {
      this.booksSubject.next(books);
    });
  }

  getBookByCatalogId(bookId: String) {
    //pipe é um modificador da chamada
    return this.http.get<IBook[]>(`${this.API_URL}`).pipe(
      filter((books: IBook[]) => {
        for (let book of books) {
          if (book.catalog_id == bookId) return true;
        }
        return false
      }),
      map((books: IBook[]) => books[0])
    );
  }

  getBookById(bookId: String) {
    //pipe é um modificador da chamada
    return this.http.get<IBook>(`${this.API_URL}/${bookId}`);
  }

  addOrUpdateBookFromCart(book?: IBook) {
    if (!book) return;

    this.getBookByCatalogId(book._id)
      .subscribe({
        next: (book: IBook) => {
          book.totalAddedToCart = (book.totalAddedToCart < book.totalInStock ? book.totalAddedToCart++ : book.totalInStock);
          this.updateBookOnCart(book).subscribe(() => {
            const booksList = this.booksSubject.getValue();
            const index = booksList.findIndex((b) => b._id == book._id)
            booksList[index] = book;
            
            this.booksSubject.next(booksList); //Att os booksSubject e avise a todos que estiverem observando
            console.log("Att do total de livros no carrinho feita com sucesso");
          });
          // error: (error) => console.log(error) 
        }
      })
  }

  addBookToCart(book?: IBook) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.API_URL, book, { headers });
  }

  updateBookOnCart(book: IBook) {
    //retirar o ID devido a problema com cors, desestruturação de objeto
    const { _id: bookId, ...bookNoId } = book;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(`${this.API_URL}/${bookId}`, bookNoId, { headers });
  }

  removeBookFromCart(bookID: String) {
    return this.http.delete(`${this.API_URL}/${bookID}`);
  }

  incrementTotalBookCopies(bookID: String) {
    this.getBookById(bookID)
      .subscribe({
        next: (book: IBook) => {
          book.totalAddedToCart++;

          if (book.totalAddedToCart > book.totalInStock) {
            book.totalAddedToCart = book.totalInStock;
          }

          this.updateBookOnCart(book).subscribe(() => {
            const booksList = this.booksSubject.getValue();
            const index = booksList.findIndex((b) => b._id == book._id)
            booksList[index] = book;

            this.booksSubject.next(booksList); //Att os booksSubject e avise a todos que estiverem observando
            console.log("Att do total de livros no carrinho feita com sucesso");
          });
          // error: (error) => console.log(error) 
        }
      });
  }

  decrementTotalBookCopies(bookID: String) {
    this.getBookById(bookID)
      .subscribe({
        next: (book: IBook) => {
          book.totalAddedToCart--;

          if (book.totalAddedToCart <= 0) {
            this.removeBookFromCart(bookID).subscribe(() => {
              const booksList = this.booksSubject.getValue();
              const index = booksList.findIndex((b) => b._id == book._id)
              booksList.splice(index, 1);

              this.booksSubject.next(booksList); //Att os booksSubject e avise a todos que estiverem observando
              console.log("Remoção de item no carrinho feita com sucesso");
            });
          }

          this.updateBookOnCart(book).subscribe(() => {
            const booksList = this.booksSubject.getValue();
            const index = booksList.findIndex((b) => b._id == book._id)
            booksList[index] = book;

            this.booksSubject.next(booksList); //Att os booksSubject e avise a todos que estiverem observando
            console.log("Att do total de livros no carrinho feita com sucesso");
          });
          // error: (error) => console.log(error) 
        }
      })
  }
}