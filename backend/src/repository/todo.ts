export class TodoRepository {

  todoList = {
    todos: [
      {
        'id': 1,
        'task': 'This is a todo example'
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
    } else {
      throw new Error(`Todo with ID ${id} does not exist.`);
    }
    return this.todoList;
  }
}
