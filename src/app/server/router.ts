import { Router } from "express";
import { bookController } from "../container";

const router = Router();

// TODO: validation and authorization middlewares would come in handy
router.get('/books', bookController.getAll);
router.get('/books/:id', bookController.getById);
router.post('/books', bookController.saveBook);
router.delete('/books/:id', bookController.deleteById);
router.get('/search', bookController.searchByTitle);

export default router;