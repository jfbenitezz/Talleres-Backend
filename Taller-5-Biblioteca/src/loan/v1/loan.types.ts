import { Schema, Document } from 'mongoose';
import { IUser } from '../../user/v1/user.types';
import { IBookInstance } from '../../book/v1/book.types';

interface ILoan extends Document {
  user: Schema.Types.ObjectId;
  bookInstance: Schema.Types.ObjectId;
  loanDate: Date;
  returnDate?: Date;
  returned: boolean;
}

// Define the interface for the user with partial information
interface IUserWithPartialInfo extends IUser {
  email: string;
}

// Extend the ILoan interface to include the user
interface ILoanWithUser extends ILoan {
  userInfo: IUserWithPartialInfo;
}


interface IBookInstanceWithPartialInfo extends IBookInstance {
  book: Schema.Types.ObjectId;
  status: string;
  location: string;
}
interface ILoanWithBookInstance extends ILoan {
  bookInstanceInfo: IBookInstanceWithPartialInfo 
  
}

export { ILoan, ILoanWithUser, ILoanWithBookInstance };