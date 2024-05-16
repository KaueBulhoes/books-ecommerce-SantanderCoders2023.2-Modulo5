//interface é algo não mutável, ou seja, não da pra criar outros tipos a partir dele

export interface IBook { //o I na frente vem para representar uma interface
    _id: string;
    catalog_id?: string;
    title: string;
    author: string;
    description: string;
    pullished_date: Date;
    price: number;
    totalInStock: number;
    totalAddedToCart: number;
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