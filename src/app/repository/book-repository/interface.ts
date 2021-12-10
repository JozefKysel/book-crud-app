import { Book, BookCoreData } from "../../service/book-service/interface";
import Repository from "../interface";

export type BookDto = Book & {
    _id: string;
}

export interface BookRepository extends Repository<Book, BookCoreData> {
    searchByTitle(title: string): Promise<Book[]>;
}