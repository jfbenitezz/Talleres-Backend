import { Router, Request, Response } from "express";
import { createLoan, returnLoan } from "./loan.controller";
import { ILoan } from "./loan.types";
import { FilterQuery } from "mongoose"; 
import { AuthMiddleware } from "../../middleware/auth";

const loanRoutes = Router();

async function CreateLoan (request: Request<ILoan>, response: Response) {
    try {
        const loan = await createLoan(request.body);
        response.status(200).json({
            message: "Success.",
            loan: loan
        });
    } catch (error) {
        response.status(500).json({
            message: "Failure creating loan.",
            information: (error as any).toString()  
        });
    }
}

async function ReturnLoan (request: Request<ILoan>, response: Response) {
    try {
        const id = request.params.id
        const loan = await returnLoan(id);
        response.status(200).json({
            message: "Success.",
            loan: loan
        });
    } catch (error) {
        response.status(500).json({
            message: "Failure creating loan.",
            information: (error as any).toString()  
        });
    }
}

// DECLARE ENDPOINTS
loanRoutes.post("/", /*AuthMiddleware*/ CreateLoan);
loanRoutes.post("/return/:id", /*AuthMiddleware*/ ReturnLoan);

// EXPORT ROUTES
export default loanRoutes;