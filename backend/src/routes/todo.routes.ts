import express from 'express';
import { TodoController } from '../controllers/todo/todo.controller';

const router = express.Router();
const todoController = new TodoController();

router.get('/todo', todoController.getTodos);

export default router;
