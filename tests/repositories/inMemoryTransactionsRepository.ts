import { ITransactionsRepository } from "../../src/application/repositories/ITransactionsRepository";
import { Transaction } from "../../src/domain/entities/transaction.model";
import { InMemoryPixKeysRepository } from "./inMemoryPixKeysRepository";

export class InMemoryTransactionsRepository implements ITransactionsRepository {
  constructor(private pixKeyRepository: InMemoryPixKeysRepository) {}

  public transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<Transaction> {
    this.transactions.push(transaction);

    return transaction;
  }

  async findByUserId(user_id: string): Promise<Transaction[]> {
    const pixKeys = this.pixKeyRepository.pixKeys.filter(
      (pixKey) => pixKey.user_id === user_id
    );

    const transactions: Transaction[] = [];

    for (const pixKey of pixKeys) {
      this.transactions.forEach((transaction) => {
        if (transaction.pixKey_key_from === pixKey.key) {
          transactions.push(transaction);
        }
      });
    }

    return transactions;
  }
}
