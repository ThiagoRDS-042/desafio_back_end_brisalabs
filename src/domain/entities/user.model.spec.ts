import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { User, UserProps } from "./user.model";

describe("Create user", () => {
  it("should be able to create a new user", () => {
    const userData: UserProps = {
      name: "test username",
      email: "test@test.com",
      phone: "+55 (11) 9.9546-1235",
    };

    const user = User.create(userData);

    expect(user).toBeTruthy();
    expect(user.id).not.toBeNull();
  });

  it("should not be able to create a user with a name longer than 100 characters", () => {
    const userData: UserProps = {
      name: "test username whit longer than 100 characters test username whit longer than 100 characters test username whit longer than 100 characters test username whit longer than 100 characters test username whit longer than 100 characters ",
      email: "test@test.com",
      phone: "+55 (11) 9.9546-1235",
    };

    try {
      User.create(userData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(Message.INVALID_USER_NAME, StatusCode.UNPROCESSABLE_ENTITY)
      );
    }
  });

  it("should not be able to create a user with a empty name", () => {
    const userData: UserProps = {
      name: "",
      email: "test@test.com",
      phone: "+55 (11) 9.9546-1235",
    };

    try {
      User.create(userData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(Message.INVALID_USER_NAME, StatusCode.UNPROCESSABLE_ENTITY)
      );
    }
  });

  it("should not be able to create a user with a email longer than 100 characters", () => {
    const userData: UserProps = {
      name: "test username",
      email:
        "testasdgahsdasdadgahsdasdadjkasdjaishdiajdkajsdoiajsdiasjdiasjdiajsdiajsdijasdkjaskdajdahsdjhajsdasdhajkshdajshdjahdjashdjahasjd@test.com",
      phone: "+55 (11) 9.9546-1235",
    };

    try {
      User.create(userData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(
          Message.INVALID_USER_EMAIL,
          StatusCode.UNPROCESSABLE_ENTITY
        )
      );
    }
  });

  it("should not be able to create a user with a invalid email", () => {
    const userData: UserProps = {
      name: "test username",
      email: "test@",
      phone: "+55 (11) 9.9546-1235",
    };

    try {
      User.create(userData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(
          Message.INVALID_USER_EMAIL,
          StatusCode.UNPROCESSABLE_ENTITY
        )
      );
    }
  });

  it("should not be able to create a user with a empty email", () => {
    const userData: UserProps = {
      name: "test username",
      email: "",
      phone: "+55 (11) 9.9546-1235",
    };

    try {
      User.create(userData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(
          Message.INVALID_USER_EMAIL,
          StatusCode.UNPROCESSABLE_ENTITY
        )
      );
    }
  });

  it("should not be able to create a user with a invalid phone", () => {
    const userData: UserProps = {
      name: "test username",
      email: "test@tes.com.br",
      phone: "41235",
    };

    try {
      User.create(userData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(Message.INVALID_PHONE, StatusCode.UNPROCESSABLE_ENTITY)
      );
    }
  });

  it("should not be able to create a user with a empty phone", () => {
    const userData: UserProps = {
      name: "test username",
      email: "test@tes.com.br",
      phone: "",
    };

    try {
      User.create(userData);
    } catch (error) {
      expect(error).toEqual(
        new AppError(Message.INVALID_PHONE, StatusCode.UNPROCESSABLE_ENTITY)
      );
    }
  });
});
