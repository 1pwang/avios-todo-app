
let todoList = {
  todos: [
    {
      "task": "This is a todo example"
    }
  ]
};

module.exports = {
  getTodos: () => Promise.resolve(todoList)
};