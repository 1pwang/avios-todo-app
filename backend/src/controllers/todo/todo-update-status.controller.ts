import { TodoRepository } from '../../repository/todo';
import { TodoService } from '../../service/todo';
import { TaskStatus } from '../../enums/task-status';

export class TodoUpdateStatusController {

  async updateStatusTask(req: any, res: any) {
    const id = parseInt(req.params.id);
    const status = req.body as TaskStatus;
    try {
      const todoRepository = new TodoRepository();
      let todoService = new TodoService(todoRepository);
      const todos = await todoService.updateTaskStatus(id, status);
      await res.json(todos);
    } catch (err) {
      res.status(500).json({error: 'Internal server error'});
    }
  }
}
