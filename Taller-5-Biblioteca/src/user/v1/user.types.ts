import { Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  permissions: string[];
  softDeleted: boolean; 
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export { IUser };