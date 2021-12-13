import BookServiceImpl from "../service/book-service";
import { BookRepositoryImpl } from "../repository/book-repository";
import BookController from "../server/book-controller";
import { BookModel } from "../db/model";

// TODO:
//  - create docker-compose file for local development

export const bookRepository = new BookRepositoryImpl(BookModel);

const bookService = new BookServiceImpl(bookRepository);

export const bookController = new BookController(bookService);
