import { Transaction } from "../../domain/entities/transaction.model";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { IPixKeysRepository } from "../repositories/IPixKeysRepository";
import { ITransactionsRepository } from "../repositories/ITransactionsRepository";

type CreateTransactionRequest = {
  amount: number;
  pixKey_key_from: string;
  pixKey_key_to: string;
};

export class CreateTransactionUseCase {
  constructor(
    private PixKeysRepository: IPixKeysRepository,
    private transactionRepository: ITransactionsRepository
  ) {}

  async execute({
    amount,
    pixKey_key_from,
    pixKey_key_to,
  }: CreateTransactionRequest) {
    const pixKeyFromExists = await this.PixKeysRepository.pixKeyAlreadyExists(
      pixKey_key_from
    );

    if (!pixKeyFromExists) {
      throw new AppError(Message.PIX_KEY_DOES_NOT_EXISTS, StatusCode.NOT_FOUND);
    }

    const pixKeyToExists = await this.PixKeysRepository.pixKeyAlreadyExists(
      pixKey_key_to
    );

    if (!pixKeyToExists) {
      throw new AppError(Message.PIX_KEY_DOES_NOT_EXISTS, StatusCode.NOT_FOUND);
    }

    const transaction = Transaction.create({
      amount,
      pixKey_key_from,
      pixKey_key_to,
    });

    await this.transactionRepository.create(transaction);

    return transaction;
  }
}
