import { Book } from "./book.model";
import { IBook } from "./book.types";

async function updateBookAction( id: string, bookData: Partial<IBook>): Promise<IBook | null> {
    const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true });
    return updatedBook;
}

export default updateBookAction