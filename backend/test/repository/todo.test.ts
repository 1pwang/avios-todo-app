const repository = require('../../src/repository/todo');

jest.mock('../../src/repository/todo');

describe('TODO repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the todo list', async () => {
    repository.getTodos.mockResolvedValue({
      todos: [
        {
          id: 1,
          task: "This is a todo example",
        },
      ],
    });

    const expected = {
      todos: [
        {
          id: 1,
          task: "This is a todo example",
        },
      ],
    };

    const actual = await repository.getTodos();
    expect(actual).toEqual(expected);
  });

  it('should add to the todo list', async () => {
    repository.addTodo.mockResolvedValue({
      todos: [
        {
          id: 1,
          task: "This is a todo example",
        },
        {
          id: 2,
          task: "This is another todo example",
        },
      ],
    });

    const item = {
      id: 2,
      task: "This is another todo example",
    };

    const expected = {
      todos: [
        {
          id: 1,
          task: "This is a todo example",
        },
        {
          id: 2,
          task: "This is another todo example",
        },
      ],
    };

    const actual = await repository.addTodo(item);
    expect(actual).toEqual(expected);
  });

  it('should delete from the todo list', async () => {
    repository.deleteTodos.mockResolvedValue({
      todos: [],
    });

    const id = 1;

    const expected = {
      todos: [],
    };

    const actual = await repository.deleteTodos(id);
    expect(actual).toEqual(expected);
  });

  it('should persist changes to the todo list', () => {
    repository.updateTodos.mockReturnValue({
      todos: [
        {
          id: 1,
          task: "This is an updated todo",
        },
      ],
    });

    const item = {
      task: "This is an updated todo",
    };
    const id = 1;

    const expected = {
      todos: [
        {
          id: 1,
          task: "This is an updated todo",
        },
      ],
    };

    const actual = repository.updateTodos(id, item);
    expect(actual).toEqual(expected);
  });

  it('should not persist changes to a non existent element in the todo list', () => {
    repository.updateTodos.mockImplementation(() => {
      throw new Error(`Todo with ID ${id} does not exist.`);
    });

    const item = {
      task: "This is a non existent todo",
    };
    const id = 2;

    expect(() => repository.updateTodos(id, item)).toThrow('Todo with ID 2 does not exist.');
  });

  it('should not delete a non existent element in the todo list', () => {
    repository.deleteTodos.mockImplementation(() => {
      throw new Error(`Todo with ID ${id} cannot be deleted.`);
    });

    const item = {
      task: "This is a non existent todo",
    };
    const id = 2;

    expect(() => repository.deleteTodos(id, item)).toThrow('Todo with ID 2 cannot be deleted.');
  });

  it('should not add an empty task in the todo list', () => {
    repository.addTodo.mockImplementation(() => {
      throw new Error(`You must type in a todo`);
    });

    const item = {
      task: "",
    };
    const id = 2;

    expect(() => repository.addTodo(id, item)).toThrow(`You must type in a todo`);
  });
});
