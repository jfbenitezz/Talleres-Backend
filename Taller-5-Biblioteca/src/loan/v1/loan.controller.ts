import createLoanAction from "./create.loan.action";
import returnLoanAction from "./return.loan.action";
import createLoanAllAction from "./create.loanAll.action";
import readBookLoanAction from "./read.bookLoan.action";
import readUserLoanAction from "./read.userLoan.action";
import { ILoan } from "./loan.types";

async function createLoan(loanData: ILoan): Promise<ILoan | null> {
    return await createLoanAction(loanData);
}

async function returnLoan(loanId: string, jwtUserId: string): Promise<ILoan | null> {
    return await returnLoanAction(loanId, jwtUserId);
}

async function createLoanAll(UserId: string, BookId: string): Promise<ILoan[] | null> {
    return await createLoanAllAction(UserId, BookId);
}   

async function readBookLoan(bookId: string): Promise<ILoan[] | null> {
    return await readBookLoanAction(bookId);
}

async function readUserLoan(userId: string): Promise<ILoan[] | null> {
    return await readUserLoanAction(userId);
}

export { createLoan, returnLoan, createLoanAll, readBookLoan, readUserLoan };