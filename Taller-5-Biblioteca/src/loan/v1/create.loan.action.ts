import { Loan } from "./loan.model";
import { ILoan } from "./loan.types";
import { User } from "../../user/v1/user.model";
import { BookInstance } from "../../book/v1/book.model";

async function createLoanAction(loanData: ILoan): Promise<ILoan | null> {
    const userExists = await User.findById(loanData.user);
    if (!userExists) {
        throw new Error('Referenced user does not exist');
    }

    const bookInstanceExists = await BookInstance.findById(loanData.bookInstance);
    if (!bookInstanceExists) {
        throw new Error('Referenced book instance does not exist');
    }

    if (bookInstanceExists.status !== 'Available') {
        throw new Error('Book instance is not available');
    }

    bookInstanceExists.status = 'Reserved';
    await bookInstanceExists.save();

    loanData.returned = false;
    const newLoan = await Loan.create(loanData);
    return newLoan;
}       

export default createLoanAction