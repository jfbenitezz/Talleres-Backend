import { Loan } from "./loan.model";
import { ILoan} from "./loan.types";

async function readUserLoanAction(userId: string): Promise<ILoan[] | null> {
    return await Loan.find({ user: userId }).populate({
        path: 'bookInstance',
        select: '-softDeleted' // Exclude these fields
    });
}    

export default readUserLoanAction