import { TodoRepository } from '../repository/todo';

export class TodoService {

  constructor(private todoRepository: TodoRepository) {
  }

  public async getTodos() {
    try {
      return await this.todoRepository.getTodos();
    } catch (err) {
      throw new Error('Unable to retrieve your todolist');

    }
  }

  public async addTodo(item: any) {
    if (!item || !item.task) {
      throw new Error('You must type in a todo');
    }

    if (item.task.length > 50) {
      throw new Error('A task cannot have more than 50 characters');
    }

    try {
      return await this.todoRepository.addTodo(item);
    } catch (err) {
      throw new Error('Unable to add to todolist');
    }
  }

  public async updateTodo(id: number, item: any) {
    if (!item || !item.task) {
      throw new Error('You must have a task');
    }

    try {
      return await this.todoRepository.updateTodos(id, item);
    } catch (err) {
      throw new Error('Unable to update todo');
    }
  }


  public async deleteTodo(id: number) {
    try {
      return await this.todoRepository.deleteTodos(id);
    } catch (err) {
      throw new Error('Unable to delete task from todolist');
    }
  }
}
