import { CreatePixKeyUseCase } from "../../src/application/usecases/createPixKeyUseCase";
import { InMemoryPixKeysRepository } from "../repositories/inMemoryPixKeysRepository";
import { InMemoryUsersRepository } from "../repositories/inMemoryUsersRepository";

export const createPixKeyUseCaseFactory = (
  usersRepository: InMemoryUsersRepository
) => {
  const pixKeysRepository = new InMemoryPixKeysRepository(usersRepository);
  const createPixKeyUseCase = new CreatePixKeyUseCase(
    pixKeysRepository,
    usersRepository
  );

  return createPixKeyUseCase;
};
