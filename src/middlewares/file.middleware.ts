import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { fileConfigs } from "../config/file.configs";
import { ApiError } from "../errors/api-error";

class FileMiddleware {
  public isFileValid() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.files) {
          throw new ApiError("Avatar file required", 400);
        }
        const file = JSON.parse(
          JSON.stringify(req.files.avatar as UploadedFile),
        );
        if (file.size >= 16777216) {
          throw new ApiError("File size is too big (16 MB max)", 400);
        }
        if (!fileConfigs.ALLOWED_EXTENSIONS.includes(file.mimetype)) {
          throw new ApiError("Wrong file type. Use only .png or .jpeg", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
