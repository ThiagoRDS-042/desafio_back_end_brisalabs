import { createUserUseCaseFactory } from "../../../tests/factories/createUserUseCase";
import { UserProps } from "../../domain/entities/user.model";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";

describe("Create user use case", () => {
  it("should be able to create a new user", async () => {
    const createUserUseCase = createUserUseCaseFactory();

    const userData: UserProps = {
      name: "test username",
      email: "test@test.com",
      phone: "+55 (11) 9.9546-1235",
    };

    const user = await createUserUseCase.execute(userData);

    expect(user).toBeTruthy();
    expect(user.id).not.toBeNull();
  });

  it("should not be able to create a new user with a existing email", async () => {
    const createUserUseCase = createUserUseCaseFactory();

    const userData: UserProps = {
      name: "test username",
      email: "testAlreadyExists@test.com",
      phone: "+55 (11) 9.9546-1235",
    };

    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new AppError(Message.USER_ALREADY_EXISTS, StatusCode.CONFLICT)
    );
  });
});
