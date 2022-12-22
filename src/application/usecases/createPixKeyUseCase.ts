import { PixKey } from "../../domain/entities/pixKey.model";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { IPixKeysRepository } from "../repositories/IPixKeysRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

type CreatePixKeyRequest = {
  key: string;
  user_id: string;
};

export class CreatePixKeyUseCase {
  constructor(
    private PixKeysRepository: IPixKeysRepository,
    private UsersRepository: IUsersRepository
  ) {}

  async execute({ key, user_id }: CreatePixKeyRequest) {
    const userExists = await this.UsersRepository.findByID(user_id);

    if (!userExists) {
      throw new AppError(Message.USER_DOES_NOT_EXISTS, StatusCode.NOT_FOUND);
    }

    const pixKeyAlreadyExists =
      await this.PixKeysRepository.pixKeyAlreadyExists(key);

    if (pixKeyAlreadyExists) {
      throw new AppError(Message.PIX_KEY_ALREADY_EXISTS, StatusCode.CONFLICT);
    }

    const pixKeys_user = await this.PixKeysRepository.findByUserId(user_id);

    if (pixKeys_user.length >= 3) {
      throw new AppError(
        Message.MAXIMUM_NUMBER_OF_PIX_KEYS_REACHED,
        StatusCode.FORBIDDEN
      );
    }

    const pixKey = PixKey.create({ key, user_id });

    await this.PixKeysRepository.create(pixKey);

    return pixKey;
  }
}
