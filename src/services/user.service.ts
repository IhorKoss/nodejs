import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    if (dto.password.length < 8) {
      throw new ApiError("Too weak password", 400);
    }
    return await userRepository.create(dto);
  }
  public async getById(userId: number): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async update(dto: Partial<IUser>, userId: number): Promise<IUser> {
    if (dto.password.length < 8) {
      throw new ApiError("Too weak password", 400);
    }
    const user = await userRepository.update(dto, userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async delete(userId: number): Promise<IUser> {
    const user = await userRepository.delete(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
}
export const userService = new UserService();
