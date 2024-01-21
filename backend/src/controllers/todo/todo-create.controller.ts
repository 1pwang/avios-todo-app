import { TodoRepository } from '../../repository/todo';
import { TodoService } from '../../service/todo';

export class TodoCreateController {

  async addTask(req: any, res: any) {

    const {task} = req.body;

    try {
      const todoRepository = new TodoRepository();
      let todoService = new TodoService(todoRepository);
      const todos = await todoService.addTodo({task});
      await res.json(todos);
    } catch (err) {
      if (!task) {
        res.status(422).json({error: 'Unprocessable entity'});
      } else {
        res.status(500).json({error: 'Internal server error'});
      }
    }
  }
}
