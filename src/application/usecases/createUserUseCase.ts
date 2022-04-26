import { User } from "../../domain/entities/user";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { IUsersRepository } from "../repositories/IUsersRepository";

export type CreateUserRequest = {
  name: string;
  email: string;
  phone: string;
};

export class CreateUser {
  constructor(private UsersRepository: IUsersRepository) {}

  async execute({ name, email, phone }: CreateUserRequest) {
    const userAlreadyExists = await this.UsersRepository.userAlreadyExists(
      email
    );

    if (userAlreadyExists) {
      throw new AppError(Message.USER_ALREADY_EXISTS, StatusCode.CONFLICT);
    }

    const user = User.create({ name, email, phone });

    await this.UsersRepository.create(user);

    return user;
  }
}
