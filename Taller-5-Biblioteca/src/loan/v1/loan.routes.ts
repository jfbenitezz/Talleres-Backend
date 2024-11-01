import { Router, Request, Response } from "express";
import { createLoan, returnLoan, createLoanAll, readBookLoan, readUserLoan } from "./loan.controller";
import { ILoan } from "./loan.types";
import { AuthMiddleware } from "../../middleware/auth";

const loanRoutes = Router();

async function CreateLoan (request: Request, response: Response) {
    try {
        const jwtUserId = request.body.authorization.id;
        request.body.user = jwtUserId;
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

async function ReturnLoan (request: Request, response: Response) {
    try {
        const jwtUserId = request.body.authorization.id;
        const id = request.params.id
        const loan = await returnLoan(id, jwtUserId);
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

async function CreateLoanAll (request: Request, response: Response) {
    try {
        const jwtUserId = request.body.authorization.id;
        const loan = await createLoanAll(jwtUserId, request.body.BookId);
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

async function ReadBookLoan (request: Request, response: Response) {
    try {
        const id = request.params.id
        const loan = await readBookLoan(id);
        if (loan?.length === 0) {
            response.status(404).json({
                message: "Loan not found."
            });
        }
        else {
            response.status(200).json({
                message: "Success.",
                loan: loan  
            });
        }
    } catch (error) {
        response.status(500).json({
            message: "Failure creating loan.",
            information: (error as any).toString()  
        });
    }
}

async function ReadUserLoan (request: Request, response: Response) {
    try {
        const id = request.params.id
        const loan = await readUserLoan(id);
        if (loan?.length === 0) {
            response.status(404).json({
                message: "Loan not found."
            });
        }
        else {
            response.status(200).json({
                message: "Success.",
                loan: loan  
            });
        }
    } catch (error) {
        response.status(500).json({
            message: "Failure creating loan.",
            information: (error as any).toString()  
        });
    }
}

// DECLARE ENDPOINTS
loanRoutes.get("/book/:id", ReadBookLoan);
loanRoutes.get("/user/:id", ReadUserLoan);
loanRoutes.post("/", AuthMiddleware, CreateLoan);
loanRoutes.post("/return/:id",AuthMiddleware , ReturnLoan);
loanRoutes.post("/all", AuthMiddleware, CreateLoanAll);

// EXPORT ROUTES
export default loanRoutes;