import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';
import {CreditDebitIndicator} from '../credit-debit-indicator';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  search: string;
  transactionsList$: Observable<Transaction[]>;
  cdIndicator = CreditDebitIndicator;
  dateASC = true;
  nameASC = undefined;
  amountASC = undefined;
  sortOrder = true;
  constructor(public transactionService: TransactionService) { }

  getValue = (t: Transaction, amount: number) => {
    return t.transaction.creditDebitIndicator === CreditDebitIndicator.debit ? -Math.abs(amount) : Math.abs(amount);
  }
}
