describe('TODO Service', () => {
  it('should get todos from repository', async () => {
    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is a task to be done'
        }
      ]
    };
    const todoRepository = {
      getTodos: async () => Promise.resolve(expected)
    };

    const todoService = require('../../src/service/todo')(todoRepository);
    const actual = await todoService.getTodos();
    expect(actual).toEqual(expected);
  });

  it('should add todos to repository', async () => {
    const item = {
      id: 2,
      task: 'This is another todo example'
    };
    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is a task to be done'
        },
        {
          id: 2,
          task: 'This is another todo example'
        }
      ]
    };
    const todoRepository = {
      addTodo: async () => Promise.resolve(expected)
    };

    const todoService = require('../../src/service/todo')(todoRepository);
    const actual = await todoService.addTodo(item);
    expect(actual).toEqual(expected);
  });

  it('should delete todos from repository', async () => {
    const id = 1;

    const expected = {
      todos: []
    };
    const todoRepository = {
      deleteTodo: async () => Promise.resolve(expected)
    };

    const todoService = require('../../src/service/todo')(todoRepository);
    const actual = await todoService.deleteTodo(id);
    expect(actual).toEqual(expected);
  });

  it('should update todos to repository', async () => {

    const id = 1;

    const item = {
      id: 1,
      task: 'This is an updated task'
    };

    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is an updated task'
        },
      ]
    };
    const todoRepository = {
      updateTodo: async () => Promise.resolve(expected)
    };

    const todoService = require('../../src/service/todo')(todoRepository);
    const actual = await todoService.updateTodo(item, id);
    expect(actual).toEqual(expected);
  });
});
