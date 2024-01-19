
let todoList = {
  todos: [
    {
      "id": 1,
      "task": "This is a todo example"
    }
  ]
};

module.exports = {
  getTodos: () => Promise.resolve(todoList)
};
