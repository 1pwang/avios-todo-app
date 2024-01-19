

describe('TODO Service', () => {
  it('should be able to get todos from repository', async () => {
    const expected = {
      todos: [
        {
          task: "This is a task to be done"
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
});