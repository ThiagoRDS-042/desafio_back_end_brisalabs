import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { PixKey } from "./pixKey.model";

export type TransactionProps = {
  id?: string;
  amount: number;
  pixKey_key_from: string;
  pixKey_key_to: string;
};

@Entity({
  name: "transactions",
})
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  amount: number;

  @Column()
  pixKey_key_from: string;

  @ManyToOne(() => PixKey)
  @JoinColumn({ name: "pixKey_key_from" })
  pixKey_from: PixKey;

  @Column()
  pixKey_key_to: string;

  @ManyToOne(() => PixKey)
  @JoinColumn({ name: "pixKey_key_from" })
  pixKey_to: PixKey;

  private constructor(transaction: TransactionProps) {
    Object.assign(this, transaction);
  }

  static create(transaction: TransactionProps) {
    if (!transaction.id) {
      transaction.id = uuid();
    }

    const newTransaction = new Transaction(transaction);

    newTransaction.isValid();

    return newTransaction;
  }

  private isValid() {
    if (this.amount < 0) {
      throw new AppError(
        Message.INVALID_AMOUNT_TRANSACTION,
        StatusCode.UNPROCESSABLE_ENTITY
      );
    }
  }
}
