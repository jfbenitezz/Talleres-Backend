import { BookInstance } from "../../book/v1/book.model";
import { Loan } from "./loan.model";
import { User } from "../../user/v1/user.model";
import { ILoan } from "./loan.types";

async function createLoanAllAction(UserId: string, BookId: string): Promise<ILoan[]> {
    const userExists = await User.findById(UserId);
    if (!userExists) {
        throw new Error('Referenced user does not exist');
    }

    const availableCopies = await BookInstance.find({ book: BookId, status: 'Available' });
    if (availableCopies.length === 0) {
        throw new Error('No available copies of book found');
    }

    // Reserve all available copies
    const updatedCopies = availableCopies.map(availableCopy => {
        availableCopy.status = 'Reserved';
        return availableCopy;
    });

    await BookInstance.bulkSave(updatedCopies);

    // Create a loan for each reserved copy
    const newLoans = await Loan.create(updatedCopies.map(copy => ({
        user: UserId,
        bookInstance: copy._id,
        loanDate: new Date(), 
        returned: false       
    })));

    // Cast the result to the ILoan type
    return newLoans as ILoan[];
}

export default createLoanAllAction;
