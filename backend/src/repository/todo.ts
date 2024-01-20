import { TaskStatus } from '../enums/task-status';

export class TodoRepository {

  todoList = {
    todos: [
      {
        'id': 1,
        'task': 'This is a todo example',
        'status': TaskStatus.Incomplete
      }
    ]
  };

  getTodos() {
    if (this.todoList) {
      return this.todoList;
    } else {
      throw new Error('Unable to retrieve todolist');
    }
  };

  addTodo(item) {
    if (item !== '') {
      this.todoList.todos.push(item);
      return this.todoList;
    } else {
      throw new Error('Unable to add to todolist');
    }
  }

  deleteTodos(id) {
    if (this.todoList.todos === id) {
      this.todoList.todos = this.todoList.todos.filter(todo => todo.id !== id);
      return this.todoList;
    } else {
      throw new Error(`Todo with ID ${id} cannot be deleted.`);
    }
  }

  updateTodos(id, item) {
    const index = this.todoList.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todoList.todos[index] = {...this.todoList.todos[index], ...item};
      return this.todoList.todos[index].task;
    } else {
      throw new Error(`Todo with ID ${id} does not exist.`);
    }
  }

  updateTaskStatus(id, status) {
    const index = this.todoList.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todoList.todos[index] = {...this.todoList.todos[index], ...status};
      return this.todoList.todos[index].status;
    } else {
      throw new Error(`Unable to update status of task ${id}`);
    }
  }

}
