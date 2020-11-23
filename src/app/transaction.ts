import {CreditDebitIndicator} from './credit-debit-indicator';
import {Currency} from './currency';

export class Transaction {
  id: number;
  categoryCode: string;
  dates: DateValue;
  transaction: TrasactionValue;
  merchant: Merchant;
}

class DateValue {
  valueDate: number;
}

class AmountCurrency {
  amount: number;
  currencyCode: Currency;
}

class Merchant {
  name: string;
  accountNumber: string;
}

class TrasactionValue {
  amountCurrency: AmountCurrency;
  type: string;
  creditDebitIndicator: CreditDebitIndicator;
}
