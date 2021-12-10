import { BookRepository } from "../../repository/book-repository/interface";
import { Book, BookCoreData } from "./interface";

// TODO: implement proper error handling, remove console.logs
export default class BookServiceImpl {
    
    constructor(
        private bookRepository: BookRepository,
    ) {}

    async getAll(): Promise<Book[]> {
        try {
            return this.bookRepository.getAll();
        } catch (error) {
            console.log(error);
            throw error;
        }
    } 
    
    async getOneById(id: string): Promise<Book> {
        try {
            return this.bookRepository.getOneById(id);
        } catch (error) {
            throw error;   
        }
    }

    async save(book: BookCoreData): Promise<string> {
        try {
            return this.bookRepository.save(book);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.bookRepository.deleteById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async searchByTitle(title: string): Promise<Book[]> {
        try {
            return this.bookRepository.searchByTitle(title);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}