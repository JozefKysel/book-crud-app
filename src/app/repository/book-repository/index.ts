import { Model } from 'mongoose';
import { Book, BookCoreData } from '../../service/book-service/interface';
import { BookRepository, BookDto } from './interface';

// TODO: proper error handling wouldn't be a bad idea
// TODO: I believe I am not using mongoose as I should - check docs and fix
export class BookRepositoryImpl implements BookRepository {
    
    constructor(
        private client: Model<Book>, 
    ) {}

    async getAll(): Promise<Book[]> {
        const bookDtos = await this.client.find({}).lean();
        return bookDtos.map(bookDto => this.map(bookDto));
    };

    async getOneById(id: string): Promise<Book> {
        const bookDto = await this.client.findOne({id}).lean();
        
        if (!bookDto) {
            return;
        }
        return this.map(bookDto);
    };
    
    async save(book: BookCoreData): Promise<string> {
        const savedBook = await this.client.create(book);
        return savedBook.id;
    };

    async deleteById(id: string): Promise<void> {
        await this.client.findOneAndDelete({id}).lean();
    };

    // TODO: test case is failing - fix
    async searchByTitle(title: string): Promise<Book[]> {
        const bookDtos = await this.client.find({ $text: { 
            $search: title,
            $caseSensitive: false,
        }}).lean();
        
        return bookDtos.map(bookDto => this.map(bookDto));
    }

    async delete(): Promise<void> {
        await this.client.deleteMany({});
    }

    // TODO: fix typing
    private map(bookDto: any): Book {
        const { __v, _id, ...book } =  bookDto;
        return { 
            ...book,
            authors: book?.authors?.map(
                ({firstName, lastName}) => ({
                    firstName,
                    lastName
            }))
        };
    }
}