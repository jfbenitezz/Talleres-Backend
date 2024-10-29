import { Schema, model } from 'mongoose';
import { IUser } from './user.types';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    softDeleted: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
  }, {
    timestamps: true,
    versionKey: false
  });

  UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || '10'));
    const pepper = process.env.PEPPER || '';
    this.password = await bcrypt.hash(this.password + pepper, salt);
    next();
  });
  
  export const User = model<IUser>('User', UserSchema);