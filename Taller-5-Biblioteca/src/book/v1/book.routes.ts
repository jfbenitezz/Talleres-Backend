import { Router, Request, Response } from "express";
import { createBook, readBooks, updateBook, readOneBook, deleteBook, createBookInstance } from "./book.controller";
import { IBook } from "./book.types";
import { FilterQuery } from "mongoose"; 
import { AuthMiddleware } from "../../middleware/auth";
import { requirePermissions }  from "../../middleware/permissions";

// INIT ROUTES
const bookRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function CreateBook(request: Request, response: Response) {
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
const validKeys: (keyof IBook)[] = ["title", "author", "genre", "publicationDate", "publisher", "softDeleted"];
async function GetBooks(request: Request, response: Response) {
  try {
    const query = request.query as FilterQuery<IBook>;

    // Ensure parameters exist in IBook interface
    for (const key in query) {
      if (!validKeys.includes(key as keyof IBook)) {
        return response.status(400).json({
          message: `Invalid query parameter: ${key}`
        });
      }
    }

    const books = await readBooks(query); 
    if (books.length === 0) {
      response.status(404).json({
        message: "No books found."
      })
    } else {
      response.status(200).json({
        message: "Success.",
        books: books
      });
    }
  } catch (error) {
    response.status(500).json({
      message: "Failure reading books", 
      information: (error as any).toString()
    });
  }
}


async function GetOneBook(request: Request, response: Response) {
  const id = request.params.id
  try {
    const book = await readOneBook(id);  
    if (book === null) {
      response.status(404).json({
        message: "Book not found."
      })
    } else {
        response.status(200).json({
        message: "Success.",
        book: book
      });
    }
  } catch (error) {
    response.status(500).json({
      message: "Failure reading book",
      information: (error as any).toString()
    })
  }
}

async function UpdateBook(request: Request, response: Response) {
  const id = request.params.id
  try {
    const book = await updateBook(id, request.body);  
    if (book === null) {
      response.status(404).json({
        message: "Book not found."
      })
    } else {
        response.status(200).json({
        message: "Success.",
        book: book
      });
    }  


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

async function CreateBookInstance (request: Request, response: Response) {
  try {
      const bookInstance = await createBookInstance(request.body);
      response.status(200).json({
          message: "Success.",
          bookInstance: bookInstance
      });
  } catch (error) {
      response.status(500).json({
          message: "Failure creating book instance.",
          information: (error as any).toString()
      });
  }
}


// DECLARE ENDPOINTS
bookRoutes.get("/", GetBooks);
bookRoutes.get("/one/:id", GetOneBook);
// Protected routes
bookRoutes.post("/", AuthMiddleware, requirePermissions(["BooksCreateRole"]), CreateBook); 
bookRoutes.put("/:id", AuthMiddleware, requirePermissions(["BooksModifyRole"]), UpdateBook); 
bookRoutes.delete("/:id", AuthMiddleware, requirePermissions(["BooksDeleteRole"]), DeleteBook); 
bookRoutes.post("/copy", AuthMiddleware, requirePermissions(["BooksInstanceRole"]), CreateBookInstance); 

// EXPORT ROUTES
export default bookRoutes;
