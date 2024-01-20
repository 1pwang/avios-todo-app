import express from 'express';
import cors from 'cors';
import { TodoRepository } from './repository/todo';
import { TodoService } from './service/todo';

const server = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const todoRepository = new TodoRepository();
  const todoService = new TodoService(todoRepository);

  app.get('/api/todo', async (req, res) => {
    res.json(await todoService.getTodos());
  });

  return app;
};

export default server;
