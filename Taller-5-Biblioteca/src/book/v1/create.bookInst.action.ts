import {  Book, BookInstance } from './book.model';
import { IBookInstance } from './book.types';

async function createBookInstanceAction(bookInstanceData: Partial<IBookInstance>): Promise<IBookInstance> {
  const newBookInstance = new BookInstance(bookInstanceData);
  const bookExists = await Book.findById(bookInstanceData.book);
  if (!bookExists) {
    throw new Error('Referenced book does not exist');
  }

  return await newBookInstance.save();
}

export default createBookInstanceAction;
