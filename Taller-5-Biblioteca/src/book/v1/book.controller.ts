import createBookAction from './create.book.action';
import {readBooksAction, readOneBookAction} from './read.book.action';
import updateBookAction from './update.book.action';
import deleteBookAction from './delete.book.action';
import createBookInstanceAction from './create.bookInst.action';
import { IBook, IBookInstance } from './book.types';
import { FilterQuery } from "mongoose"; 


// Read books with filters
async function readBooks(filters: FilterQuery<IBook>): Promise<IBook[]> {
  return await readBooksAction(filters);
}

async function readOneBook(id: string): Promise<IBook | null> {
  return await readOneBookAction(id);
}
// Create a new book
async function createBook(bookData: IBook): Promise<IBook> {
  return await createBookAction(bookData);
}

// Update an existing book
async function updateBook(id: string, updatedData: Partial<IBook>): Promise<IBook | null> {
  return await updateBookAction(id, updatedData);
}

// Soft delete a book
async function deleteBook(id: string): Promise<void> {
  await deleteBookAction(id);
}

async function createBookInstance(bookInstanceData: Partial<IBookInstance>): Promise<IBookInstance> {
  return await createBookInstanceAction(bookInstanceData);
}


// Export controller functions
export { readBooks, readOneBook, createBook, updateBook, deleteBook, createBookInstance };
