import { IUser } from "../interfaces/user.interface";
import { readFile, writeFile } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await readFile();
  }
  public async create(dto: Partial<IUser>): Promise<any> {
    const users = await readFile();
    const newUser = {
      id: Number(users[users.length - 1].id) + 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await writeFile(users);
    return newUser;
  }
  public async getById(userId: number): Promise<IUser | null> {
    const users = await readFile();
    return users.find((user) => Number(user.id) === userId);
  }
  public async update(
    dto: Partial<IUser>,
    userId: number,
  ): Promise<IUser | null> {
    const users = await readFile();
    const userIndex = users.findIndex((user) => Number(user.id) === userId);
    users[userIndex] = {
      ...users[userIndex],
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    await writeFile(users);
    return users[userIndex];
  }
  public async delete(userId: number): Promise<IUser | null> {
    const users = await readFile();
    const userIndex = users.findIndex((user) => Number(user.id) === userId);
    const user = users[userIndex];
    console.log(userIndex);
    console.log(user);

    users.splice(userIndex, 1);
    await writeFile(users);
    return user;
  }
}
export const userRepository = new UserRepository();
