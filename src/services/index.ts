import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { userRouter } from "../routers/user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
// app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await readFile();
//     res.send(users);
//   } catch (e) {
//     next(e);
//   }
// });
//

// app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await readFile();
//     const { name, email, password } = req.body;
//     const id = Number(users[users.length - 1].id) + 1;
//     const newUser = { id, name, email, password };
//     users.push(newUser);
//     await writeFile(users);
//     res.status(201).send(newUser);
//   } catch (e) {
//     next(e);
//   }
// });

// app.get(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await readFile();
//       const userId = Number(req.params.userId);
//       const user = users.find((user) => Number(user.id) === userId);
//       if (!user) {
//         throw new ApiError("User not found", 404);
//       }
//       res.send(user);
//     } catch (e) {
//       next(e);
//     }
//   },
// );

// app.put(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await readFile();
//       const userId = Number(req.params.userId);
//       const userIndex = users.findIndex((user) => Number(user.id) === userId);
//       if (userIndex === -1) {
//         throw new ApiError("User not found", 404);
//       }
//       const { name, email, password } = req.body;
//       if (password.length < 8) {
//         throw new ApiError("Too weak password", 400);
//       }
//       users[userIndex] = { ...users[userIndex], name, email, password };
//       await writeFile(users);
//       res.status(201).send(users[userIndex]);
//     } catch (e) {
//       next(e);
//     }
//   },
// );

// app.delete(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await readFile();
//       const userId = Number(req.params.userId);
//       const userIndex = users.findIndex((user) => Number(user.id) === userId);
//       if (userIndex === -1) {
//         throw new ApiError("User not found", 404);
//       }
//       users.splice(userIndex, 1);
//       await writeFile(users);
//       res.sendStatus(204);
//     } catch (e) {
//       next(e);
//     }
//   },
// );
app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
