// import { Component, OnInit } from '@angular/core';

// import {MatSelectModule} from '@angular/material/select';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {provideNativeDateAdapter} from '@angular/material/core';
// import {MatButtonModule} from '@angular/material/button';
// import { IBook } from '../../interfaces/book.interface';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-book-create',
//   standalone: true,
//   imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, FormsModule],
//   providers: [provideNativeDateAdapter()],
//   templateUrl: './book-create.component.html',
//   styleUrl: './book-create.component.css'
// })
// export class BookCreateComponent implements OnInit{
//   booksList: IBook[] = []
//   newBook: IBook = {
//       "id": 1,
//       "title": "Título do Livro",
//       "author": "Nome do Autor",
//       "description": "Descrição detalhada do livro",
//       "pullished_date": new Date (),
//       "price": 59.99,
//       "totalInStock": 20,
//       "totalAddedToCart": 0
//   };

//   // changeTitleValue(event: Event){
//   //   const target =  event.target as HTMLInputElement;
//   //   this.newBook.title = target.value;
    
//   // }

//   ngOnInit(){
//     this.booksList = JSON.parse(localStorage.getItem("booksList") || "[]")
//   }

//   submitForm(){
//     console.log(this.newBook);
//     this.booksList.push(this.newBook);
//     localStorage.setItem("booksList", JSON.stringify(this.booksList))
//   }
// }