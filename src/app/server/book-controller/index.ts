import { Router, Request, Response } from 'express';
import BookServiceImpl from '../../service/book-service';

export default class BookController {

    constructor(private bookService: BookServiceImpl) {}

    public getAll = async (req: Request, res: Response) => {
        try {
            console.log("here2")
            const books = await this.bookService.getAll();
            return res.status(200).json(books);       
        } catch (error) {
            console.log(error)
            return res.sendStatus(500);
        } 
    }

    public getById = async (req: Request, res: Response) => {
        try {
            console.log("here3")
            const books = await this.bookService.getOneById(req.params.id);
    
            if (!books) {
                return res.sendStatus(404);
            }
            return res.status(200).json(books);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500);
        }
    }

    public saveBook = async (req: Request, res: Response) => {
        try {
            console.log("here3")
            const savedBook = await this.bookService.save(req.body);
            res.status(201).json(savedBook);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500);
        }
    }

    public deleteById = async (req: Request, res: Response) => {
        try {
            await this.bookService.delete(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500);
        }
    }

    public searchByTitle = async (req: Request, res: Response) => {
        try {
            const title = req.query.title as string;
            const searchResult = await this.bookService.searchByTitle(title);
            res.status(200).json(searchResult);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
}