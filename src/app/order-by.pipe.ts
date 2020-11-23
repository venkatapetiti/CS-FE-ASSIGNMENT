import { Pipe, PipeTransform } from '@angular/core';
import {Transaction} from './transaction';
@Pipe({  name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  private collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base',
  });
  transform(records: Array<Transaction>, args?: any): any {
    if (args.val === 'date') {
      return records.sort((a, b) => {
       return args.order ? b.dates.valueDate - a.dates.valueDate : a.dates.valueDate - b.dates.valueDate;
      });
    }
    if (args.val === 'amount') {
      return records.sort((a, b) => {
        return args.order ? b.transaction.amountCurrency.amount - a.transaction.amountCurrency.amount
          : a.transaction.amountCurrency.amount - b.transaction.amountCurrency.amount;
      });
    }
    if (args.val === 'name') {
      return records.sort((a, b) => {
        return args.order ? this.collator.compare(a.merchant.name, b.merchant.name)
          : this.collator.compare(b.merchant.name, a.merchant.name);
      });
    }
    return records;
  }
}
