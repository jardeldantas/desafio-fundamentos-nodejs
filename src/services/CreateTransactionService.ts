import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < transaction.value) {
        throw Error('You don t have enough balance.');
      }
    }

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
