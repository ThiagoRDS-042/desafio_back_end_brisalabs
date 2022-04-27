import { createTransactionFakeFactory } from "../../../tests/factories/createTransactionFake";
import { findTransactionsByUserIdUseCaseFactory } from "../../../tests/factories/findTransactionsByUserIdUseCase";
import { InMemoryPixKeysRepository } from "../../../tests/repositories/inMemoryPixKeysRepository";
import { InMemoryTransactionsRepository } from "../../../tests/repositories/inMemoryTransactionsRepository";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";

describe("Find transactions by user id use case", () => {
  it("should be able to find transactions by user id", async () => {
    const pixKeysRepository = new InMemoryPixKeysRepository();
    const transactionRepository = new InMemoryTransactionsRepository(
      pixKeysRepository
    );
    const findTransactionsByUserIdUseCase =
      findTransactionsByUserIdUseCaseFactory(transactionRepository);

    const { transaction, user_from } = createTransactionFakeFactory(
      pixKeysRepository,
      transactionRepository
    );

    const transactions = await findTransactionsByUserIdUseCase.execute({
      user_id: user_from.id,
    });

    expect(transactions).toBeTruthy();
    expect(transactions[0]).toEqual(transaction);
  });

  it("should not be able to find transactions by empty user id", async () => {
    const pixKeysRepository = new InMemoryPixKeysRepository();
    const transactionRepository = new InMemoryTransactionsRepository(
      pixKeysRepository
    );
    const findTransactionsByUserIdUseCase =
      findTransactionsByUserIdUseCaseFactory(transactionRepository);

    createTransactionFakeFactory(pixKeysRepository, transactionRepository);

    await expect(
      findTransactionsByUserIdUseCase.execute({
        user_id: "",
      })
    ).rejects.toEqual(new AppError(Message.NOT_FOUND, StatusCode.NOT_FOUND));
  });
});
