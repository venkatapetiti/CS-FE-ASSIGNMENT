import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: 'transfer-preview-dialog.component.html',
})
export class TransferPreviewDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Transaction,
    public dialogRef: MatDialogRef<TransferPreviewDialogComponent>,
    private transactionService: TransactionService) {
  }

  onTransfer = () => {
    this.transactionService.postTransaction(this.data).then(
      (data) => {
        this.transactionService.transactionsRefresh$.next(undefined);
        this.dialogRef.close(true);
      }
    );
  }
}
