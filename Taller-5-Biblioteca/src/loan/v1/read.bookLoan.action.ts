import { Loan } from "./loan.model";
import { ILoanWithUser } from "./loan.types";

// Define the readBookLoanAction function
async function readBookLoanAction(bookId: string): Promise<ILoanWithUser[] | null> {
    const bookInstanceLoans = await Loan.find({ bookInstance: bookId })
        .populate({
            path: 'user',
            select: '-password -isAdmin -softDeleted -permissions' // Exclude these fields
        });

    // Cast the result to ILoanWithUser[]
    return bookInstanceLoans as ILoanWithUser[]; 
}

export default readBookLoanAction;
