import createLoanAction from "./create.loan.action";
import returnLoanAction from "./return.loan.action";
import { ILoan } from "./loan.types";

async function createLoan(loanData: ILoan): Promise<ILoan | null> {
    return await createLoanAction(loanData);
}

async function returnLoan(loanId: string): Promise<ILoan | null> {
    return await returnLoanAction(loanId);
}

export { createLoan, returnLoan }