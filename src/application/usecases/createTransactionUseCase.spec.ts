import { createPixKeysFakeFactory } from "../../../tests/factories/createPixKeysFake";
import { createTransactionUseCaseFactory } from "../../../tests/factories/createTransactionUseCase";
import { InMemoryPixKeysRepository } from "../../../tests/repositories/inMemoryPixKeysRepository";
import { TransactionProps } from "../../domain/entities/transaction.model";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";

describe("Create transaction use case", () => {
  it("should be able to create a new transaction", async () => {
    const pixKeysRepository = new InMemoryPixKeysRepository();
    const createTransactionUseCase =
      createTransactionUseCaseFactory(pixKeysRepository);

    const { pixKey_key_from, pixKey_key_to } =
      createPixKeysFakeFactory(pixKeysRepository);

    const transactionData: TransactionProps = {
      amount: 10,
      pixKey_key_from: pixKey_key_from.key,
      pixKey_key_to: pixKey_key_to.key,
    };

    const transaction = await createTransactionUseCase.execute(transactionData);

    expect(transaction).toBeTruthy();
    expect(transaction.id).not.toBeNull();
  });

  it("should not be able to create a new transaction with a empty pixKey_key_from", async () => {
    const pixKeysRepository = new InMemoryPixKeysRepository();
    const createTransactionUseCase =
      createTransactionUseCaseFactory(pixKeysRepository);

    const { pixKey_key_to } = createPixKeysFakeFactory(pixKeysRepository);

    const transactionData: TransactionProps = {
      amount: 10,
      pixKey_key_from: "",
      pixKey_key_to: pixKey_key_to.key,
    };

    await expect(
      createTransactionUseCase.execute(transactionData)
    ).rejects.toEqual(
      new AppError(Message.PIX_KEY_DOES_NOT_EXISTS, StatusCode.NOT_FOUND)
    );
  });

  it("should not be able to create a new transaction with a empty pixKey_key_to", async () => {
    const pixKeysRepository = new InMemoryPixKeysRepository();
    const createTransactionUseCase =
      createTransactionUseCaseFactory(pixKeysRepository);

    const { pixKey_key_from } = createPixKeysFakeFactory(pixKeysRepository);

    const transactionData: TransactionProps = {
      amount: 10,
      pixKey_key_from: pixKey_key_from.key,
      pixKey_key_to: "",
    };

    await expect(
      createTransactionUseCase.execute(transactionData)
    ).rejects.toEqual(
      new AppError(Message.PIX_KEY_DOES_NOT_EXISTS, StatusCode.NOT_FOUND)
    );
  });
});
