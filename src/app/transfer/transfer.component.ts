import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';
import {CreditDebitIndicator} from '../credit-debit-indicator';
import {Currency} from '../currency';
import {MatDialog} from '@angular/material/dialog';
import {TransferPreviewDialogComponent} from './transfer-preview-dialog.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  transferForm: FormGroup;
  maxAmount: number;
  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm = () => {
    this.maxAmount = this.transactionService.totalAmount;
    this.transferForm = this.fb.group({
      fromAccount: [{value: 'Free Checking(4692) - $' + this.maxAmount, disabled: true}],
      toAccount: [''],
      amount: ['', [Validators.max(this.maxAmount + 500), Validators.min(0)]],
    });
  }

  onSubmit = (value: any) => {
    const transaction = new Transaction();
    transaction.merchant = { name: null, accountNumber: null};
    transaction.transaction = { amountCurrency: { amount: null, currencyCode: Currency.eur},
      type: 'Online Payment',
      creditDebitIndicator: CreditDebitIndicator.debit
    };
    transaction.dates = {valueDate: new Date().valueOf()};
    transaction.merchant.name = value.toAccount;
    transaction.transaction.amountCurrency.amount = value.amount;
    this.transactionService.totalAmount = this.transactionService.totalAmount - value.amount;
    this.openDialog(transaction);
  }

  openDialog = (transaction: Transaction) => {
    const dialogRef = this.dialog.open(TransferPreviewDialogComponent, {
      panelClass: 'custom-dialog',
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadForm();
      }
    });
  }

}
