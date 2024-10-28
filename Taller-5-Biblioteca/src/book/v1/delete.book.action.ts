import { Book } from "./book.model";
async function deleteBookAction(id: string): Promise<void> {
  await Book.findByIdAndUpdate(id, { softDeleted: true });
}

export default deleteBookAction;
