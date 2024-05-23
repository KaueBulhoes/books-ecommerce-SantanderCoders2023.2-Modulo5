import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'citation'
})
export class CitationPipe implements PipeTransform {
  transform(authorName: string): string {
    //Vai fazer o split e pegar por espaço
    const namesArray = authorName.split(" ");
    const lastName = namesArray.pop();
    const firstNameInitial = namesArray[0][0];
    const secondNameInitial = namesArray[1][0];

    return `${lastName?.toUpperCase()}, ${firstNameInitial}. ${secondNameInitial}.`;
  }
}