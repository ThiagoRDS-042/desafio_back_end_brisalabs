import { Transaction } from "../../domain/entities/transaction.model";

export interface ITransactionsRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findByUserId(user_id: string): Promise<Transaction[]>;
}
