import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcome = this.transactions.reduce(function (acumulador, atual) {
      if (atual.type === 'outcome') {
        return acumulador + atual.value;
      }
      return acumulador;
    }, 0);

    const income = this.transactions.reduce(function (acumulador, atual) {
      if (atual.type === 'income') {
        return acumulador + atual.value;
      }
      return acumulador;
    }, 0);

    const a = income - outcome;

    const extrato: Balance = {
      income,
      outcome,
      total: a,
    };
    return extrato;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
