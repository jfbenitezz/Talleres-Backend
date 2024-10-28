import { Schema ,Document } from "mongoose";
interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
    publisher: string;
    availableCopies: number;
    softDeleted: boolean;     // Flag for soft deletion
  }

  interface IBookInstance extends Document {
    book: Schema.Types.ObjectId;  // Reference to Book
    status: string;               // Available, Reserved, etc.
    location: string;             // Location within the library, optional
    softDeleted: boolean;         // Flag for soft deletion of the copy
  }
  
  export { IBook, IBookInstance };