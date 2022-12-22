import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";

export type UserProps = {
  id?: string;
  email: string;
  name: string;
  phone: string;
};

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  private constructor(user: UserProps) {
    Object.assign(this, user);
  }

  static create(user: UserProps) {
    if (!user.id) {
      user.id = uuid();
    }

    const newUser = new User(user);

    newUser.isValid();

    return newUser;
  }

  private isValid() {
    const validEmail = /^.{3,}@.{3,}[\.][a-z]{2,}$/;
    const validPhone = /^(\+\d{2}\s)?(\(\d{2}\)\s)?(9\.|9)?\d{4}[-]?\d{4}$/;

    if (this.name.length > 100 || this.name.length <= 0) {
      throw new AppError(
        Message.INVALID_USER_NAME,
        StatusCode.UNPROCESSABLE_ENTITY
      );
    } else if (this.email.length > 100 || !validEmail.test(this.email)) {
      throw new AppError(
        Message.INVALID_USER_EMAIL,
        StatusCode.UNPROCESSABLE_ENTITY
      );
    } else if (this.phone.length > 20 || !validPhone.test(this.phone)) {
      throw new AppError(
        Message.INVALID_PHONE,
        StatusCode.UNPROCESSABLE_ENTITY
      );
    }
  }
}
