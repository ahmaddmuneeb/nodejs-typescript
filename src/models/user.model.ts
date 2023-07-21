import mongoose from 'mongoose';
import { IUser } from '../types/userSchema';
// This is user schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    roleType: { type: String, default: 'user' },
    isConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
// making user model from user schema
export const UserModel = mongoose.model<IUser>('User', UserSchema);
