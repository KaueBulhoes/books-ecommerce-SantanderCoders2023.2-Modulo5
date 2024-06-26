import { Routes } from '@angular/router';

// import { BooksCatalogComponent } from './pages/books-catalog/books-catalog.component';
import { BookCreateComponent } from './pages/book-create/book-create.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'books',
        // component: BooksCatalogComponent,
        loadComponent: () => import('./pages/books-catalog/books-catalog.component').then(c => c.BooksCatalogComponent)
        // children: [
        //   { path: 'create', component: BookCreateComponent },
        //   { path: 'update/:id', component: BookCreateComponent },
        // ]
    },
    { path: 'books/create', component: BookCreateComponent, canActivate: [authGuard] },
    { path: 'books/update/:id', component: BookCreateComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: "books", pathMatch: "full" },
    // ** seria uma espécie de rota coringa, qualquer rota não achada será redirecionado para page not found
    { path: "**", component: PageNotFoundComponent },
];