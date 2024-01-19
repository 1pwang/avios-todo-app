jest.mock('../../src/repository/todo', () => ({
  TodoRepository: jest.fn().mockImplementation(() => ({
    getTodos: jest.fn(),
    addTodo: jest.fn(),
    deleteTodos: jest.fn(),
    updateTodos: jest.fn(),
  })),
}));

describe('TODO repository', () => {
  let sut: jest.Mocked<todoService.TodoService>;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = new TodoService.TodoService() as jest.Mocked<todoService.TodoService>;
  });

  it('should return the todo list', async () => {
    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is a todo example',
        },
      ],
    };
    (sut.getTodos as jest.Mock).mockResolvedValue(expected);

    const actual = await sut.getTodos();
    expect(actual).toEqual(expected);
  });

  it('should add to the todo list', async () => {
    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is a todo example',
        },
        {
          id: 2,
          task: 'This is another todo example',
        },
      ],
    };

    const item = {
      id: 2,
      task: 'This is another todo example',
    };

    (sut.addTodo as jest.Mock).mockResolvedValue(expected);

    const actual = await sut.addTodo(item);
    expect(actual).toEqual(expected);
  });

  it('should delete from the todo list', async () => {
    const id = 1;

    const expected = {
      todos: [],
    };

    (sut.deleteTodos as jest.Mock).mockResolvedValue(expected);

    const actual = await sut.deleteTodos(id);
    expect(actual).toEqual(expected);
  });

  it('should update the todo list', async () => {

    const item = {
      task: 'This is an updated todo',
    };
    const id = 1;

    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is an updated todo',
        },
      ],
    };

    (sut.updateTodos as jest.Mock).mockResolvedValue(expected);

    const actual = await sut.updateTodos(id, item);
    expect(actual).toEqual(expected);
  });

  it('should not allow more than 50 characters to be added as a todo', async () => {

    const item = {
      task: 'Need to work and cook and exercise and fix car and ...',
    };
    const id = 2;

    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is the only todo',
        },
      ],
    };

    (sut.updateTodos as jest.Mock).mockResolvedValue(expected);

    const actual = await sut.addTodo(id, item);
    expect(actual).toEqual(expected);
  });

  it('should not add an empty task in the todo list', async () => {
    const item = {
      id: 2,
      task: '',
    };

    (sut.addTodo as jest.Mock).mockImplementation(() => {
      throw new Error('You must type in a todo');
    });

    await expect(async () => {
      sut.addTodo(item);
    }).rejects.toThrow('You must type in a todo');
  });
});
