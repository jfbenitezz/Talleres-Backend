import { Book } from "./book.model";
import { IBook } from "./book.types";
import { FilterQuery } from "mongoose"; 

async function readBooksAction(filters: FilterQuery<IBook>): Promise<IBook[]> {
  // Default only show if soft deleted is false but can be overridden
  const filterQuery: FilterQuery<IBook> = {  softDeleted: false,...filters } as FilterQuery<IBook>;
  return await Book.find(filterQuery)
}

async function readOneBookAction(id: string): Promise<IBook | null> {
  //only show if soft deleted is false
  return await Book.findOne({ _id: id, softDeleted: false });
}

export { readBooksAction, readOneBookAction };