import { Book } from "./book.model";
import { IBook } from "./book.types";

// DECLARE ACTION FUNCTION
async function createBookAction(bookData: IBook): Promise<IBook> {
  const newBook = await Book.create(bookData);
  return newBook;
}
// EXPORT ACTION FUNCTION
export default createBookAction;
