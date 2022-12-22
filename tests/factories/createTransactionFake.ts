import { PixKey } from "../../src/domain/entities/pixKey.model";
import { Transaction } from "../../src/domain/entities/transaction.model";
import { User } from "../../src/domain/entities/user.model";
import { InMemoryPixKeysRepository } from "../repositories/inMemoryPixKeysRepository";
import { InMemoryTransactionsRepository } from "../repositories/inMemoryTransactionsRepository";
import { InMemoryUsersRepository } from "../repositories/inMemoryUsersRepository";

export const createTransactionFakeFactory = (
  pixKeysRepository: InMemoryPixKeysRepository,
  transactionRepository: InMemoryTransactionsRepository
) => {
  const usersRepository = new InMemoryUsersRepository();

  const user_from = User.create({
    name: "user-fake-one",
    email: "userFakeOne@example.com",
    phone: "+55 (11) 9.8546-1235",
  });
  usersRepository.users.push(user_from);

  const pixKey_key_from = PixKey.create({
    key: "1234-7896",
    user_id: user_from.id,
  });
  pixKeysRepository.pixKeys.push(pixKey_key_from);

  const user_to = User.create({
    name: "user-fake-two",
    email: "userFakeTwo@example.com",
    phone: "+55 (11) 9.9525-1235",
  });
  usersRepository.users.push(user_to);

  const pixKey_key_to = PixKey.create({
    key: "123.456.789-10",
    user_id: user_to.id,
  });
  pixKeysRepository.pixKeys.push(pixKey_key_to);

  const transaction = Transaction.create({
    amount: 10,
    pixKey_key_from: pixKey_key_from.key,
    pixKey_key_to: pixKey_key_to.key,
  });
  transactionRepository.transactions.push(transaction);

  return { transaction, user_from, user_to };
};
