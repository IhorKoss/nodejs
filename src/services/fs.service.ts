import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const readFile = async (): Promise<IUser[]> => {
  try {
    const pathToFile = path.join(__dirname, "../../userBase.json");
    const data = await fs.readFile(pathToFile, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Помилка запису", e.message);
  }
};

const writeFile = async (users: IUser[]): Promise<void> => {
  try {
    const pathToFile = path.join(__dirname, "../../userBase.json");
    await fs.writeFile(pathToFile, JSON.stringify(users));
  } catch (e) {
    console.log("Помилка запису", e.message);
  }
};
export { readFile, writeFile };
