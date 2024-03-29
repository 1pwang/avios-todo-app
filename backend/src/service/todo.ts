import { TodoRepository } from '../repository/todo';
import { TaskStatus } from '../enums/task-status';
import {TaskDto} from "../dto-types/task-dto";

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

  public async addTodo(item: { task: string }) {
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

  public async updateTaskStatus(id: number, status: TaskStatus) {
    try {
      return await this.todoRepository.updateTaskStatus(id, status);
    } catch (err) {
      throw new Error('There is an error in updating status of your task');
    }
  }
}
