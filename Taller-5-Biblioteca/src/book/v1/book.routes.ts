import { Router, Request, Response } from "express";
import { createBook, readBooks, updateBook, readOneBook, deleteBook } from "./book.controller";
import { IBook } from "./book.types";
import { AuthMiddleware } from "../../middleware/auth";

// INIT ROUTES
const bookRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function CreateBook(request: Request<IBook>, response: Response) {
  try {
    const book = await createBook(request.body);
    response.status(200).json({
      message: "Success.",
      book: book
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure creating book",
      information: (error as any).toString()
    })
  }
}

async function GetBooks(request: Request, response: Response) {
  try {
    const books = await readBooks(request.body);
    response.status(200).json({
      message: "Success.",
      books: books
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure reading books", 
      information: (error as any).toString()
    })
  }
}

async function GetOneBook(request: Request, response: Response) {
  const id = request.params.id
  try {
    const book = await readOneBook(id);    
    response.status(200).json({
      message: "Success.",
      book: book
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure reading book",
      information: (error as any).toString()
    })
  }
}

async function UpdateBook(request: Request<IBook>, response: Response) {
  const id = request.params.id
  try {
    const book = await updateBook(id, request.body);    
    response.status(200).json({
      message: "Success.",
      book: book
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure updating book",
      information: (error as any).toString()
    })
  }
}

async function DeleteBook(request: Request, response: Response) {
  const id = request.params.id
  try {
    await deleteBook(id);    
    response.status(200).json({
      message: "Success.",
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure deleting book",
      information: (error as any).toString()
    })
  }
}


// DECLARE ENDPOINTS
bookRoutes.get("/", GetBooks);
bookRoutes.get("/one/:id", GetOneBook);
bookRoutes.post("/", /*AuthMiddleware*/ CreateBook);
bookRoutes.put("/:id", /*AuthMiddleware*/ UpdateBook);
bookRoutes.delete("/:id", /*AuthMiddleware*/ deleteBook);

// EXPORT ROUTES
export default bookRoutes;
