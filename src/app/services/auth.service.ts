import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //loggedUser: IUser;
  private loggedUserSubject = new BehaviorSubject<IUser | null>(null);
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(private router: Router) {
    //this.loggedUser = JSON.parse(localStorage.getItem("loggedUser" || "{}"));
    this.loggedUserSubject.next(this.getLoggedUser());
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem("loggedUser") || "null");
  }

  loginUser(user: IUser): boolean {
    if (user.email == "admin@admin.com" && user.password == "admin123") {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      this.loggedUserSubject.next(this.getLoggedUser());
      // se usar / e o nome de onde eu quero ir, o Angular irá concatenar no endereço que já tenho, se não for utilizado será redirecionado para o escrito
      this.router.navigate(['books']);
      return true;
    }
    return false;
  }

  logoutUser() {
    localStorage.removeItem("loggedUser");
    this.loggedUserSubject.next(null);
    //Navigate para redirecionar de volta para o login ao realizar o logout
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    return this.loggedUserSubject.getValue() != null;
  }
}