import { Entity } from "../../core/domain/Entity";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";

export type UserProps = {
  email: string;
  name: string;
  phone: string;
  createdAt?: Date;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string) {
    if (!props.createdAt) {
      props.createdAt = new Date();
    }

    const user = new User(props, id);

    user.isValid();

    return user;
  }

  private isValid() {
    const validEmail = /^.{3,}@.{3,}[\.][a-z]{2,}$/;
    const validPhone = /^[+]\d{2}\s\(\d{2}\)\s\d[.]\d{4}[-]\d{4}$/;

    if (this.props.name.length > 100 || this.props.name.length <= 0) {
      throw new AppError(
        Message.INVALID_USER_NAME,
        StatusCode.UNPROCESSABLE_ENTITY
      );
    } else if (
      this.props.email.length > 100 ||
      !validEmail.test(this.props.email)
    ) {
      throw new AppError(
        Message.INVALID_USER_EMAIL,
        StatusCode.UNPROCESSABLE_ENTITY
      );
    } else if (
      this.props.phone.length > 20 ||
      !validPhone.test(this.props.phone)
    ) {
      throw new AppError(
        Message.INVALID_PHONE,
        StatusCode.UNPROCESSABLE_ENTITY
      );
    }
  }
}
