import { Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  softDeleted: boolean; 
}

export { IUser };