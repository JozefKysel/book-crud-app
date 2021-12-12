import { Router } from "express";
import { bookController } from "../container";

const router = Router();

// TODO: validation and authorization middlewares would come in handy
router.get('/api/v0/books', bookController.getAll);
router.get('/api/v0/books/:id', bookController.getById);
router.post('/api/v0/books', bookController.saveBook);
router.delete('/api/v0/books/:id', bookController.deleteById);
router.get('/api/v0/search', bookController.searchByTitle);

export default router;