import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { User } from "./user.model";

export type PixKeyProps = {
  id?: string;
  key: string;
  user_id: string;
};

@Entity({
  name: "pix_keys",
})
export class PixKey {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  key: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  private constructor(pixKey: PixKeyProps) {
    Object.assign(this, pixKey);
  }

  static create(pixKey: PixKeyProps) {
    if (!pixKey.id) {
      pixKey.id = uuid();
    }

    const newPixKey = new PixKey(pixKey);

    newPixKey.isValid();

    return newPixKey;
  }

  private isValid() {
    if (this.key.length > 100 || this.key.length <= 0) {
      throw new AppError(
        Message.INVALID_PIX_KEY,
        StatusCode.UNPROCESSABLE_ENTITY
      );
    }
  }
}
