import { TodoRepository } from '../../repository/todo';
import { TodoService } from '../../service/todo';

export class TodoDeleteController {

  async deleteTask(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const todoRepository = new TodoRepository();
      let todoService = new TodoService(todoRepository);
      const todos = await todoService.deleteTodo(id);
      await res.json(todos);
    } catch (err) {
      res.status(500).json({error: 'Internal server error'});
    }
  }
}
