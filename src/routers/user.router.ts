import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getList);
router.post("/", commonMiddleware.isBodyValid(), userController.create);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(),
  userController.update,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.delete,
);

export const userRouter = router;
