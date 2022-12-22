import { IPixKeysRepository } from "../../src/application/repositories/IPixKeysRepository";
import { PixKey } from "../../src/domain/entities/pixKey.model";
import { InMemoryUsersRepository } from "./inMemoryUsersRepository";

export class InMemoryPixKeysRepository implements IPixKeysRepository {
  constructor(private usersRepository: InMemoryUsersRepository) {}

  public pixKeys: PixKey[] = [];

  async create(pixKey: PixKey): Promise<PixKey> {
    this.pixKeys.push(pixKey);

    return pixKey;
  }

  async pixKeyAlreadyExists(key: string): Promise<boolean> {
    const pixKeyAlreadyExists = this.pixKeys.find(
      (pixKey) => pixKey.key === key
    );

    return !!pixKeyAlreadyExists;
  }

  async findByUserId(user_id: string): Promise<PixKey[]> {
    const pixKeys = this.pixKeys.filter((pixKey) => pixKey.user_id === user_id);

    return pixKeys;
  }

  async findByKey(key: string): Promise<PixKey | null> {
    const pixKey = this.pixKeys.find((pixKey) => pixKey.key === key);

    if (pixKey) {
      const user = await this.usersRepository.findByID(pixKey.user_id);
      pixKey.user = user;

      return pixKey;
    }

    return null;
  }
}
