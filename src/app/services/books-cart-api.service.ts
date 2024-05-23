import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/book.interface';
import { BehaviorSubject, delay, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksCartApiService {
  //Esse é o cara que avisa sobre as mudanças na api
  private booksSubject = new BehaviorSubject<IBook[]>([]);
  //Estou dizendo que booksList$ é observável
  booksList$ = this.booksSubject.asObservable().pipe(delay(7000));
  API_URL: string = "https://crudcrud.com/api/221e73e74e4e4a4eade6065e9b2d1436/cart";

  constructor(private http: HttpClient) {
    this.getAllBooks();
  }

  getAllBooks() {
    return this.http.get<IBook[]>(this.API_URL).subscribe((books: IBook[]) => {
      //Next significa que será o próximo valor a ser guardado, é a atualização que o BehaviorSubject traz
      this.booksSubject.next(books);
    });
  }

  getBookById(bookId: String) {
    //pipe é um modificador da chamada
    return this.http.get<IBook>(`${this.API_URL}/${bookId}`);
  }

  getBookByCatalogId(bookId: String) {
    //pipe é um modificador da chamada
    return this.http.get<IBook[]>(`${this.API_URL}`).pipe(
      // filter((books: IBook[]) => {
      //   for (let book of books) {
      //     if (book.catalog_id == bookId) return true;
      //   }
      //   return false
      // }),
      map((books: IBook[]) => {
        const foundBook = books.find(book => book.catalog_id === bookId);
        return foundBook ?? undefined;
      })
    );
  }

  addOrUpdateBookFromCart(book?: IBook) {
    console.log(book);
    if (!book) return;

    this.getBookByCatalogId(book._id)
      .subscribe((foundBook?: IBook) => {
        console.log(foundBook);
        if (!foundBook) {
          book.totalAddedToCart = 1;
          this.addBookToCart(book).subscribe((book: IBook) => {
            const booksList = this.booksSubject.getValue();
            booksList.push(book);
            this.booksSubject.next(booksList);
          });
          return;
        }

        foundBook.totalAddedToCart = (foundBook.totalAddedToCart < foundBook.totalInStock)? foundBook.totalAddedToCart + 1 : foundBook.totalAddedToCart;
        this.updateBookOnCart(foundBook).subscribe(() => {
          const booksList = this.booksSubject.getValue();
          const index = booksList.findIndex((b) => b._id == foundBook._id);
          booksList[index] = foundBook;

          this.booksSubject.next(booksList); // atualiza o SUBJECT e avisa a geral que ta olhando pra ele
          console.log("Atualização do total de livros no carrinho feita com sucesso");
        });
      });
  }

  addBookToCart(book: IBook) {
    const { _id: bookId, ...bookNoId } = book;
    bookNoId.catalog_id = bookId;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<IBook>(this.API_URL, bookNoId, { headers });
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