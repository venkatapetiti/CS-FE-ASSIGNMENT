import {TransactionService} from './transaction.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {OrderByPipe} from './order-by.pipe';
import {Transaction} from './transaction';

describe('Order-by Pipe', () => {
  const pipe = new OrderByPipe();
  const data = [
    {
      dates: {
        valueDate: 1600493600000
      },
      transaction: {
        amountCurrency: {
          amount: 5000,
        }
      },
      merchant: {
        name: 'Backbase',
      }
    },
    {
      dates: {
        valueDate: 1600387200000
      },
      transaction: {
        amountCurrency: {
          amount: -82.02,
        }
      },
      merchant: {
        name: 'The Tea Lounge',
      }
    },
    {
      dates: {
        valueDate: 1600370800000
      },
      transaction: {
        amountCurrency: {
          amount: -22.1,
        }
      },
      merchant: {
        name: 'Amazon Online Store',
      }
    }
  ] as Transaction[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order by date with ASC', () => {
    const retVal = pipe.transform( data, {val: 'date', order: true });
    expect(retVal[0]).toEqual({
      dates: {
        valueDate: 1600493600000
      },
      transaction: {
        amountCurrency: {
          amount: 5000,
        }
      },
      merchant: {
        name: 'Backbase',
      }
    });
  });

  it('should order by date with DESC', () => {
    const retVal = pipe.transform( data, {val: 'date', order: false });
    expect(retVal[0]).toEqual({
      dates: {
        valueDate: 1600370800000
      },
      transaction: {
        amountCurrency: {
          amount: -22.1,
        }
      },
      merchant: {
        name: 'Amazon Online Store',
      }
    });
  });

  it('should order by name with ASC', () => {
    const retVal = pipe.transform( data, {val: 'name', order: true });
    expect(retVal[0]).toEqual({
      dates: {
        valueDate: 1600370800000
      },
      transaction: {
        amountCurrency: {
          amount: -22.1,
        }
      },
      merchant: {
        name: 'Amazon Online Store',
      }
    });
  });

  it('should order by name with DESC', () => {
    const retVal = pipe.transform( data, {val: 'name', order: false });
    expect(retVal[0]).toEqual({
      dates: {
        valueDate: 1600387200000
      },
      transaction: {
        amountCurrency: {
          amount: -82.02,
        }
      },
      merchant: {
        name: 'The Tea Lounge',
      }
    });
  });

  it('should order by amount with ASC', () => {
    const retVal = pipe.transform( data, {val: 'amount', order: true });
    expect(retVal[0]).toEqual({
        dates: {
        valueDate: 1600493600000
      },
      transaction: {
        amountCurrency: {
          amount: 5000,
        }
      },
      merchant: {
        name: 'Backbase',
      }
    });
  });

  it('should order by amount with DESC', () => {
    const retVal = pipe.transform( data, {val: 'amount', order: false });
    expect(retVal[0]).toEqual({
      dates: {
        valueDate: 1600387200000
      },
      transaction: {
        amountCurrency: {
          amount: -82.02,
        }
      },
      merchant: {
        name: 'The Tea Lounge',
      }
    });
  });
});
