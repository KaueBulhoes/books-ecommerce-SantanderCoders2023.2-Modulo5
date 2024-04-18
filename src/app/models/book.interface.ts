//interface é algo não mutável, ou seja, não da pra criar outros tipos a partir dele

export interface IBook { //o I na frente vem para representar uma interface
    id: number;
    title: string;
    author: string;
    description: string;
    pullished_date: Date;
    price: Number;
};

//Exemplo de type

// type BookType = {
//     id: number;
//     title: string;
//     author: string;
//     description: string;
//     pullished_date: Date;
//     price: Number;
// };

// type FantasyBookType = BookType & {fantasyType: "high fantasy"};