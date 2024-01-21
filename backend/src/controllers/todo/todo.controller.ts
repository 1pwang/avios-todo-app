import { TodoService } from '../../service/todo';
import { TodoRepository } from '../../repository/todo';

export class TodoController {

  async getTodos(req: any, res: any) {
    try {
      const todoRepository = new TodoRepository();
      let todoService = new TodoService(todoRepository);
      const todos = await todoService.getTodos();
      await res.json(todos);
    } catch (err) {
      console.error(err);
      res.status(500).json({error: 'Internal server error'});
    }
  }
}
