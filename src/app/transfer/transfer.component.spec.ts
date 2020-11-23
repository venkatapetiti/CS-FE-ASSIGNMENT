import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferComponent } from './transfer.component';
import {TransactionService} from '../transaction.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {Transaction} from '../transaction';
import {Currency} from '../currency';
import {CreditDebitIndicator} from '../credit-debit-indicator';
import {of} from 'rxjs';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, MatDialogModule, TranslateModule.forRoot()],
      declarations: [ TransferComponent ],
      providers: [TransactionService, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke loadForm on ngOnInit', () => {
    spyOn(component, 'loadForm');
    component.ngOnInit();
    expect(component.loadForm).toHaveBeenCalled();
  });

  it('on loadForm should create loadForm', () => {
    component.loadForm();
    expect(component.maxAmount).toBe(5824.76);
    expect(component.transferForm.get('fromAccount').value).toEqual('Free Checking(4692) - $5824.76');
    expect(component.transferForm.get('toAccount').value).toEqual('');
    expect(component.transferForm.get('amount').value).toEqual('');
  });

  it('onSubmit should create a transaction object and invoke openDialog method', () => {
    spyOn(component, 'openDialog');
    const value = {toAccount: 'testing', amount: 200};
    component.onSubmit(value);
    const transaction = new Transaction();
    transaction.merchant = { name: null, accountNumber: null};
    transaction.transaction = { amountCurrency: { amount: null, currencyCode: Currency.eur},
      type: 'Online Payment',
      creditDebitIndicator: CreditDebitIndicator.debit
    };
    transaction.dates = {valueDate: new Date().valueOf()};
    transaction.merchant.name = value.toAccount;
    transaction.transaction.amountCurrency.amount = value.amount;
    expect(component.openDialog).toHaveBeenCalledWith(transaction);
  });

  it('openDialog should open Mat-Dialog', () => {
    component.openDialog(new Transaction());
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

});
