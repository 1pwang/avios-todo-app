import { TaskStatus } from '../enums/task-status';

export class TodoRepository {

  todoList = {
    todos: [
      {
        id: 1,
        task: 'This is a todo example',
        status: TaskStatus.Incomplete as TaskStatus
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

  addTodo(item: { task: string }) {
    if(item){
      const latestTodo = this.todoList.todos[this.todoList.todos.length - 1];
      const newId = latestTodo ? latestTodo.id + 1 : 1;

      const newTask = {
        id: newId,
        task: item.task,
        status: TaskStatus.Incomplete
      };

      this.todoList.todos.push(newTask);
      return newTask;
    } else {
      throw new Error('Unable to add to todolist');
    }
  }

  deleteTodos(id: number) {
    if (this.todoList.todos.some(todo => todo.id === id)) {
      this.todoList.todos = this.todoList.todos.filter(todo => todo.id !== id);
      return this.todoList;
    } else {
      throw new Error(`Todo with ID ${id} cannot be deleted.`);
    }
  }

  updateTodos(id: number, item: string) {
    const index = this.todoList.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todoList.todos[index].task = item;
      return this.todoList.todos[index].task;
    } else {
      throw new Error(`Todo with ID ${id} does not exist.`);
    }
  }

  updateTaskStatus(id: number, status: TaskStatus) {
    const index = this.todoList.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todoList.todos[index].status = status;
      return this.todoList.todos[index].status;
    } else {
      throw new Error(`Unable to update status of task ${id}`);
    }
  }

}
