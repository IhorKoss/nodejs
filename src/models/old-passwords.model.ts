import { model, Schema } from "mongoose";

import { IOldPassword } from "../interfaces/old-password.interface";
import { User } from "./user.model";

const oldPasswordSchema = new Schema(
  {
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },

    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OldPassword = model<IOldPassword>(
  "old-passwords",
  oldPasswordSchema,
);
