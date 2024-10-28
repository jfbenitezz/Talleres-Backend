import { Book } from "./book.model";
import { IBook } from "./book.types";
import { FilterQuery } from "mongoose"; 

async function readBooksAction(filters: FilterQuery<IBook>): Promise<IBook[]> {
  const filterQuery: FilterQuery<IBook> = { softDeleted: false, ...filters } as FilterQuery<IBook>;
  return await Book.find(filterQuery)
}

async function readOneBookAction(id: string): Promise<IBook | null> {
  return await Book.findById(id);
}

export { readBooksAction, readOneBookAction };