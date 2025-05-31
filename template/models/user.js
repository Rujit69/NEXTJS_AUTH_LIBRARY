//user.js

import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "user name already exists!"],
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [6, "Password should be at least 6 characters long."],
  },
  image: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is new/changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = models.User || model("User", UserSchema);

export default User;
