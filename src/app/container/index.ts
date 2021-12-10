import BookServiceImpl from "../service/book-service";
import { BookRepositoryImpl } from "../repository/book-repository";
import BookController from "../server/book-controller";
import { BookModel } from "../db/model";

// I decided not to use relational database for this assignment altought it might 
// be a better choice if we want avoid storing duplicit authors, or we want to 
// add author management in the future
// however at this point, there is only requirement to be able to manage books, and 
// I don't think that the overhead of storing duplicit authors is that big
// also since authors are fairly static records, we can assume that there will be very little
// updates on these records

// also speed of development was a factor in my decision
const bookRepository = new BookRepositoryImpl(BookModel);

const bookService = new BookServiceImpl(bookRepository);

export const bookController = new BookController(bookService);
