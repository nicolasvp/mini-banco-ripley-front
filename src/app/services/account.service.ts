import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url: string = environment.url + '/account';

  constructor(private httpClient: HttpClient) {
  }

  getMovements(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/movements').pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  loadBalance(amount): Observable<any> {
    return this.httpClient.post<any>(this.url + '/load-balance', amount).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  transferBalance(transfer): Observable<any> {
    return this.httpClient.post<any>(this.url + '/transfer-balance', transfer).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  withdrawals(amount): Observable<any> {
    return this.httpClient.post<any>(this.url + '/withdrawals', amount).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
