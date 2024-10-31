import { Schema, model } from 'mongoose';
import { ILoan } from './loan.types';

const LoanSchema = new Schema<ILoan>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookInstance: { type: Schema.Types.ObjectId, ref: 'BookInstance', required: true },
    loanDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    returned: { type: Boolean, default: false },
  });
  
  export const Loan = model<ILoan>('Loan', LoanSchema);
  