import { createPixKeysFakeFactory } from "../../../tests/factories/createPixKeysFake";
import { InMemoryPixKeysRepository } from "../../../tests/repositories/inMemoryPixKeysRepository";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { Transaction, TransactionProps } from "./transaction.model";

describe("Create transaction", () => {
  it("should be able to create a new transaction", () => {
    const { pixKey_key_from, pixKey_key_to } = createPixKeysFakeFactory(
      new InMemoryPixKeysRepository()
    );

    const transactionData: TransactionProps = {
      amount: 100,
      pixKey_key_from: pixKey_key_from.key,
      pixKey_key_to: pixKey_key_to.key,
    };

    const transaction = Transaction.create(transactionData);

    expect(transaction).toBeTruthy();
    expect(transaction.id).not.toBeNull();
  });

  it("should not be able to create a new transaction with a negative amount", () => {
    const { pixKey_key_from, pixKey_key_to } = createPixKeysFakeFactory(
      new InMemoryPixKeysRepository()
    );

    const transactionData: TransactionProps = {
      amount: -100,
      pixKey_key_from: pixKey_key_from.key,
      pixKey_key_to: pixKey_key_to.key,
    };

    try {
      Transaction.create(transactionData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(
          Message.INVALID_AMOUNT_TRANSACTION,
          StatusCode.UNPROCESSABLE_ENTITY
        )
      );
    }
  });
});
