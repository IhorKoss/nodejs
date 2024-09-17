import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find({});
  }
  public async create(dto: Partial<IUser>): Promise<any> {
    return await User.create(dto);
  }
  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }
  public async update(
    dto: Partial<IUser>,
    userId: string,
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }
  public async delete(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}
export const userRepository = new UserRepository();
