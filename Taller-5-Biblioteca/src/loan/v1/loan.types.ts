import { Schema, Document } from 'mongoose';

interface ILoan extends Document {
  user: Schema.Types.ObjectId;
  bookInstance: Schema.Types.ObjectId;
  loanDate: Date;
  returnDate?: Date;
  returned: boolean;
}

export { ILoan }