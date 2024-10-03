import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";

const router = Router();

router.get("/", userController.getList);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(),
  userController.updateMe,
);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);
router.post(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isFileValid(),
  userController.uploadAvatar,
);
router.delete(
  "/me/delete-avatar",
  authMiddleware.checkAccessToken,
  userController.deleteAvatar,
);
router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
export const userRouter = router;
