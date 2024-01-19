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
    return this.todoList;
  };

  addTodo(item) {
    if (item !== '') {
      this.todoList.todos.push(item);
      return this.todoList;
    } else {
      throw new Error('You must type in a todo');
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
