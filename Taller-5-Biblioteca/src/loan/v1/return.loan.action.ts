import { Loan } from "./loan.model";
import { ILoan } from "./loan.types";
import { BookInstance } from "../../book/v1/book.model";

async function returnLoanAction(loanId: string): Promise<ILoan | null> {

    const loan = await Loan.findById(loanId);
    if (!loan) throw new Error('Loan not found');
  
    // Mark as returned
    loan.returned = true;
    loan.returnDate = new Date();
  
    // Update the book instance status
    const bookInstance = await BookInstance.findById(loan.bookInstance);
    if (bookInstance) {
      bookInstance.status = 'Available';
      await bookInstance.save();
    }
  
    return await loan.save();
  }
  
export default returnLoanAction
  