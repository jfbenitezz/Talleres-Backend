import { Loan } from "./loan.model";
import { ILoan, ILoanWithBookInstance} from "./loan.types";

async function readUserLoanAction(userId: string): Promise<ILoan[] | null> {
    return await Loan.find({ user: userId }).populate('bookInstance');
}    

export default readUserLoanAction