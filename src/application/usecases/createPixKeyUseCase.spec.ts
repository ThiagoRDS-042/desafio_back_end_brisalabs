import { createPixKeyUseCaseFactory } from "../../../tests/factories/createPixKeyUseCase";
import { createUserFakeFactory } from "../../../tests/factories/createUserFake";
import { InMemoryUsersRepository } from "../../../tests/repositories/inMemoryUsersRepository";
import { PixKeyProps } from "../../domain/entities/pixKey.model";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";

describe("Create pix key use case", () => {
  it("should be able to create a new pix key", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createPixKeyUseCase = createPixKeyUseCaseFactory(usersRepository);

    const user = createUserFakeFactory(usersRepository);

    const pixKeyData: PixKeyProps = {
      key: "test@test.com.br",
      user_id: user.id,
    };

    const pixKey = await createPixKeyUseCase.execute(pixKeyData);

    expect(pixKey).toBeTruthy();
    expect(pixKey.id).not.toBeNull();
  });

  it("should not be able to create a new pix key with a existing pixKey", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createPixKeyUseCase = createPixKeyUseCaseFactory(usersRepository);

    const user = createUserFakeFactory(usersRepository);

    const pixKeyData: PixKeyProps = {
      key: "12453678",
      user_id: user.id,
    };

    await createPixKeyUseCase.execute(pixKeyData);

    await expect(createPixKeyUseCase.execute(pixKeyData)).rejects.toEqual(
      new AppError(Message.PIX_KEY_ALREADY_EXISTS, StatusCode.CONFLICT)
    );
  });

  it("should not be able to create more than 3 pix keys per user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createPixKeyUseCase = createPixKeyUseCaseFactory(usersRepository);

    const user = createUserFakeFactory(usersRepository);

    const pixKeyDataOne: PixKeyProps = {
      key: "12453678",
      user_id: user.id,
    };
    await createPixKeyUseCase.execute(pixKeyDataOne);

    const pixKeyDataTwo: PixKeyProps = {
      key: "test@test.com",
      user_id: user.id,
    };
    await createPixKeyUseCase.execute(pixKeyDataTwo);

    const pixKeyDataThree: PixKeyProps = {
      key: "123.456.789-10",
      user_id: user.id,
    };
    await createPixKeyUseCase.execute(pixKeyDataThree);

    const pixKeyDataFour: PixKeyProps = {
      key: "f12c0ac5-9fbe-4728-a702-79fb5f24ba04",
      user_id: user.id,
    };

    await expect(createPixKeyUseCase.execute(pixKeyDataFour)).rejects.toEqual(
      new AppError(
        Message.MAXIMUM_NUMBER_OF_PIX_KEYS_REACHED,
        StatusCode.FORBIDDEN
      )
    );
  });
});
