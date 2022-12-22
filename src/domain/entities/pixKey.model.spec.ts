import { createUserFakeFactory } from "../../../tests/factories/createUserFake";
import { InMemoryUsersRepository } from "../../../tests/repositories/inMemoryUsersRepository";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { PixKey, PixKeyProps } from "./pixKey.model";

describe("Create pix key", () => {
  it("should be able to create a new pix key", () => {
    const user = createUserFakeFactory(new InMemoryUsersRepository());

    const pixKeyData: PixKeyProps = {
      key: "123.456.789-10",
      user_id: user.id,
    };

    const pixKey = PixKey.create(pixKeyData);

    expect(pixKey).toBeTruthy();
    expect(pixKey.id).not.toBeNull();
  });

  it("should not be able to create a new pix key with a key longer than 100 characters", () => {
    const user = createUserFakeFactory(new InMemoryUsersRepository());

    const pixKeyData: PixKeyProps = {
      key: "123.456.789-104555445487845481787817874874897446576546723546725465273247564274657621765457642675462724671467614764",
      user_id: user.id,
    };

    try {
      PixKey.create(pixKeyData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(Message.INVALID_PIX_KEY, StatusCode.UNPROCESSABLE_ENTITY)
      );
    }
  });

  it("should not be able to create a new pix key with a empty key", () => {
    const user = createUserFakeFactory(new InMemoryUsersRepository());

    const pixKeyData: PixKeyProps = {
      key: "",
      user_id: user.id,
    };

    try {
      PixKey.create(pixKeyData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(Message.INVALID_PIX_KEY, StatusCode.UNPROCESSABLE_ENTITY)
      );
    }
  });
});
