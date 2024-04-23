import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBook } from '../../interfaces/book.interface';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-books-cart',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './books-cart.component.html',
  styleUrl: './books-cart.component.css'
})
export class BooksCartComponent implements OnInit, OnChanges{
  @Input("booksList") addedBooksList: IBook[] = [];
  //(aqui virá um alias) a string de dentro será usada pra fazer o propery binding

  ngOnInit(){
    console.log(this.addedBooksList);
  }

  //função do ciclo de vida que é executado toda vez que alguma alteração é feita no componente
  //ngOnChanges só roda se fizer uma atribuição
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.addedBooksList);
  }
}
