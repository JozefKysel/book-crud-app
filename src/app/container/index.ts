import BookServiceImpl from "../service/book-service";
import { BookRepositoryImpl } from "../repository/book-repository";
import BookController from "../server/book-controller";
import { BookModel } from "../db/model";

/*
 
 Architecture:
    I attempted to implement this app using a layered architecture (rest layer, service layer, and db layer), this way 
    code is nicely decoupled we are able to change the db or web framework easily without making any changes to core business logic. 

    I used OO design, and patterns such as dependency injection, which makes relations between each layer more transparent
    and also this would make code more testable if we were to write unit tests(which i omitted for this assignment for reasons
    explained in book-controller/index.spec.ts)

 Database choice: 
    I decided not use relational database for this assignment although it might be a better choice if we were to implement proper
    many to many relationship between books and authors. But since the only requirement for this assignemt is to implement book management
    only, I just use mongoDB because it makes overall implementation more simple and straightforward. And i don't think, that overhead
    of storing duplicit authors is that terrible.

 Framework choice:
    I decided to use expressjs, since it is a framework that I am familiar with and also because
    I like it's middleware system, but other than that I don't have a preference for any node.js framework.

 For both speed of development was a factor in my decision   
*/



// I decided to use mongoose ORM for mongoDB because using schemaless database is not exactly a 
// scalable solution

// TODO:
//  - create docker-compose file for local development

export const bookRepository = new BookRepositoryImpl(BookModel);

const bookService = new BookServiceImpl(bookRepository);

export const bookController = new BookController(bookService);
