import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionListComponent} from './transaction-list.component';
import {HttpClientModule} from '@angular/common/http';
import {TransactionService} from '../transaction.service';
import {TranslateModule} from '@ngx-translate/core';
import {Transaction} from '../transaction';
import {CreditDebitIndicator} from '../credit-debit-indicator';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, TranslateModule.forRoot()],
      declarations: [ TransactionListComponent ],
      providers: [TransactionService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getValue should determine if value is negative or positive', () => {
    const transaction = {
      id: 1,
      categoryCode: '#12a580',
      dates: {
        valueDate: 1600493600000
      },
      transaction: {
        amountCurrency: {
          amount: 5000,
          currencyCode: 'EUR'
        },
        type: 'Salaries',
        creditDebitIndicator: 'DBIT'
      },
      merchant: {
        name: 'Backbase',
        accountNumber: 'SI64397745065188826'
      }
    } as Transaction;
    const retVal = component.getValue(transaction, 200);
    expect(retVal).toBe(-200);
    transaction.transaction.creditDebitIndicator = CreditDebitIndicator.credit;
    const anotherVal = component.getValue(transaction, 200);
    expect(anotherVal).toBe(200);
  });
});
