import {SearchByNamePipe} from './search-by-name.pipe';
import {Transaction} from './transaction';

describe('SearchByName Pipe', () => {
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
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new SearchByNamePipe();

  it('find the transaction by name "Ama"', () => {
    expect(pipe.transform(data, 'Ama')).toEqual([{
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
    }]);
  });

  it('find the transaction by name "the"', () => {
    expect(pipe.transform(data, 'the')).toEqual([{
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
    }]);
  });

});
