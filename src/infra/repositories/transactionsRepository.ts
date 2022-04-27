import { getRepository, Repository } from "typeorm";
import { ITransactionsRepository } from "../../application/repositories/ITransactionsRepository";
import { Transaction } from "../../domain/entities/transaction.model";

export class TransactionsRepository implements ITransactionsRepository {
  private transactionRepo: Repository<Transaction>;

  constructor() {
    this.transactionRepo = getRepository(Transaction);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await this.transactionRepo.save(transaction);

    return newTransaction;
  }

  async findByUserId(user_id: string): Promise<Transaction[]> {
    const transactions = await this.transactionRepo.query(
      `SELECT "transactions"."id", "transactions"."amount", "transactions"."pixKey_key_from",
      "transactions"."pixKey_key_to" FROM "transactions" LEFT JOIN "pix_keys" ON
      "pix_keys"."key" = "transactions"."pixKey_key_from" WHERE "pix_keys"."user_id" = '${user_id}'`
    );

    return transactions;
  }
}
