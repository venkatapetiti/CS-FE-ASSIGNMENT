import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Transaction} from './transaction';
import {CreditDebitIndicator} from './credit-debit-indicator';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionsUrl = 'api/transactions';  // URL to web api
  public totalAmount = 5824.76;
  transactionsRefresh$ = new BehaviorSubject<void>(null);
  transactionsList$: Observable<Transaction[]>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) {
    this.transactionsList$ = this.transactionsRefresh$.pipe(
      switchMap((v) => {
        return this.getTransactions();
      })
    );
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl)
      .pipe(
        map((t) => {
          t.map(((a) => {
            const num = a.transaction.amountCurrency.amount;
            a.transaction.amountCurrency.amount = a.transaction.creditDebitIndicator === CreditDebitIndicator.debit
              ? -Math.abs(Number(num)) : Math.abs(Number(num));
          }));
          return t.sort((a, b) => b.dates.valueDate - a.dates.valueDate);
        }),
        catchError(this.handleError<Transaction[]>('getTransactions', []))
      );
  }

  postTransaction = async (transaction: Transaction) => {
    return await this.http.post(this.transactionsUrl, transaction, this.httpOptions).toPromise();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
