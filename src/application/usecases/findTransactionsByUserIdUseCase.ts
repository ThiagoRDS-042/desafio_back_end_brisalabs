import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { ITransactionsRepository } from "../repositories/ITransactionsRepository";

type FindTransactionsByUserIdRequest = {
  user_id: string;
};

export class FindTransactionsByUserIdUseCase {
  constructor(private transactionRepository: ITransactionsRepository) {}

  async execute({ user_id }: FindTransactionsByUserIdRequest) {
    const transactions_user = await this.transactionRepository.findByUserId(
      user_id
    );

    if (transactions_user.length === 0) {
      throw new AppError(Message.NOT_FOUND, StatusCode.NOT_FOUND);
    }

    return transactions_user;
  }
}
