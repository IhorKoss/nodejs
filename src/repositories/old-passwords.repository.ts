import { IOldPassword } from "../interfaces/old-password.interface";
import { OldPassword } from "../models/old-passwords.model";

class OldPasswordsRepository {
  public async addOldPassword(
    userId: string,
    oldPassword: string,
  ): Promise<void> {
    await OldPassword.create({ _userId: userId, password: oldPassword });
  }
  public async deleteBeforeDate(date: Date): Promise<number> {
    const { deletedCount } = await OldPassword.deleteMany({
      createdAt: { $lt: date },
    });
    return deletedCount;
  }
  public async findByParams(userId: string): Promise<IOldPassword[]> {
    return await OldPassword.find({ _userId: userId });
  }
}
export const oldPasswordsRepository = new OldPasswordsRepository();
