import { IPixKeysRepository } from "../../src/application/repositories/IPixKeysRepository";
import { PixKey } from "../../src/domain/entities/pixKey.model";

export class InMemoryPixKeysRepository implements IPixKeysRepository {
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
}
