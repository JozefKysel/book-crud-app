import { bookRepository } from "../../container";
import supertest from 'supertest';
import app from "..";
import { BookCoreData } from "../../service/book-service/interface";
import mongoose from 'mongoose';

// I decided 'trophy' testing model and focus on integration testing only
// and as there is no significant business logic downstream, i don't consider it necessary 
// to write unit tests for service and db layer

// TODO: 
// - make test cases more thorough (i.e. test for data returned as well as for status codes)
// - use .env.test instead of hardcoding env variables
// - fix endpoints for which tests are failing
// - usage of database and overall test enviroment might be improved
// - don't use repository class for inserting data into db, use raw model instead
describe("BookController", () => {

    const request = supertest(app);

    const authorMock = {
        firstName: 'john',
        lastName: 'doe'
    }

    const bookMock1: BookCoreData = {
        title: 'title-1',
        description: 'description-1',
        authors: [authorMock]
    }

    const bookMock2: BookCoreData = {
        title: 'title-2',
        description: 'description-2',
        authors: [authorMock]
    }

    const bookMocks = [bookMock1, bookMock2];

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/book-crud-app-db');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    })

    describe('Get books', () => {

        beforeEach(async () => {
            await bookRepository.delete();
            
            await Promise.all(bookMocks.map(async book => 
                bookRepository.save(book)
            ));
        });

        it ('should return 200 and all books', async () => {
            const response = await request.get('/api/v0/books');

            expect(response.statusCode).toEqual(200);
        })
        
    });

    describe('Get book by id', () => {

        let bookMock1Id;

        beforeEach(async () => {
            await bookRepository.delete();
            
            bookMock1Id = await bookRepository.save(bookMock1);
        });

        it('should return 200 and get book with given id', async () => {
            const response = await request.get(`/api/v0/books/${bookMock1Id}`);

            expect(response.statusCode).toEqual(200)
        });

        it('should return 404 when book with given id does not exists', async () => {
            const randomId = "61b6ef8a85d19a5d6bfbaa6b";
            const response = await request.get(`/api/v0/books/${randomId}`);

            expect(response.statusCode).toEqual(404);
        })
    });

    describe('Post book', () => {
        beforeEach(async () => {
            await bookRepository.delete();
        });

        it ('should return 201 and create a new book', async () => {
            const response = await request.post('/api/v0/books');

            expect(response.statusCode).toEqual(201);
        });
    });

    describe('Delete book by id', () => {
        let bookMock1Id;

        beforeEach(async () => {
            await bookRepository.delete();
            
            bookMock1Id = await bookRepository.save(bookMock1);
        });

        it('should return 204 and delete a book', async () => {
            const response = await request.delete(`/api/v0/books/${bookMock1Id}`);

            expect(response.statusCode).toEqual(204);
        });
    });

    describe('Search book by title', () => {
        beforeEach(async () => {
            await bookRepository.delete();
            
            await Promise.all(bookMocks.map(async book => 
                bookRepository.save(book)
            ));
        });

        it('should return 200 and all books with matching title', async () => {
            const response = await request.get(`/api/v0/search?title=title-`);

            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveLength(2);
        });

        it('should return 200 and 0 books because book with given table does not exists', async () => {
            const response = await request.get(`/api/v0/search?title=abcd`);

            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveLength(0);
        });
    });


});
