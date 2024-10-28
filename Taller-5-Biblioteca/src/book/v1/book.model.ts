import { Schema, model } from 'mongoose';
import { IBook, IBookInstance } from './book.types';

// Schema for general book
const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  publisher: { type: String, required: true },
  availableCopies: { type: Number, default: 0 },
  softDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });

export const Book = model<IBook>('Book', BookSchema);


// Schema for instance book
const BookInstanceSchema = new Schema<IBookInstance>({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    status: { type: String, enum: ['Available', 'Reserved'], default: 'Available' },
    location: { type: String },
    softDeleted: { type: Boolean, default: false }
  }, { timestamps: true, versionKey: false });
  
export const BookInstance = model<IBookInstance>('BookInstance', BookInstanceSchema);
