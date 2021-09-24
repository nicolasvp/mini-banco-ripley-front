import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.url + '/auth';
  private _token: string | undefined;
  private _userInfo: User;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public get token() {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }

    return null;
  }

  public get userInfo() {
    if (this._userInfo != null) {
      return this._userInfo;
    } else if (this._userInfo == null && sessionStorage.getItem('userInfo') != null) {
      this._userInfo = JSON.parse(sessionStorage.getItem('userInfo')) as User;
      console.log((this._userInfo))
      return this._userInfo;
    }

    return null;
  }

  login(credentials: any): Observable<any> {
    return this.httpClient.post<any>(this.url + "/login", credentials).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  register(newUser): Observable<any> {
    return this.httpClient.post<any>(environment.url + "/users", newUser).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  logout(): void {
    this._token = null;
    this._userInfo = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }

  /**
   * Guarda el token en Session storage
   * @param token
   */
  storeToken(token: string): void {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  /**
   * Guarda la información del usuario en Session Storage
   * @param data
   */
  storeUserInfo(data: Object): void {
    sessionStorage.setItem('userInfo', JSON.stringify(data));
  }

  /**
   * Convierte en json la informacion del token(payload)
   * @param token
   */
  readToken(token: string): any {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  /**
   * Verifica si el usuario está autenticado mediante la lectura del payload del token guardado en SessionStorage
   */
  isAuthenticated(): boolean {
    let payload = this.readToken(this.token);
    return payload != null && payload.role && Object.keys(payload.permissions).length > 0
  }
}
