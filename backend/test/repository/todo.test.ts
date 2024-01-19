import * as todoRepository from '../../src/repository/todo';

jest.mock('../../src/repository/todo', () => ({
  TodoRepository: jest.fn().mockImplementation(() => ({
    getTodos: jest.fn(),
    addTodo: jest.fn(),
    deleteTodos: jest.fn(),
    updateTodos: jest.fn(),
  })),
}));

describe('TODO repository', () => {
  let repository: jest.Mocked<todoRepository.TodoRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new todoRepository.TodoRepository() as jest.Mocked<todoRepository.TodoRepository>;
  });

  it('should return the todo list from the repository', async () => {
    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is a todo example',
        },
      ],
    };
    (repository.getTodos as jest.Mock).mockResolvedValue(expected);

    const actual = await repository.getTodos();
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

    (repository.addTodo as jest.Mock).mockResolvedValue(expected);

    const actual = await repository.addTodo(item);
    expect(actual).toEqual(expected);
  });

  it('should delete from the todo list', async () => {
    const id = 1;

    const expected = {
      todos: [],
    };

    (repository.deleteTodos as jest.Mock).mockResolvedValue(expected);

    const actual = await repository.deleteTodos(id);
    expect(actual).toEqual(expected);
  });

  it('should persist changes to the todo list', async () => {

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

    (repository.updateTodos as jest.Mock).mockResolvedValue(expected);

    const actual = await repository.updateTodos(id, item);
    expect(actual).toEqual(expected);
  });

  it('should return an error when trying to persist changes to a non existent element in the todo list', async () => {

    const item = {
      task: 'This is a non existent todo',
    };
    const id = 2;

    (repository.updateTodos as jest.Mock).mockImplementation(() => {
      throw new Error(`Todo with ID ${id} does not exist.`);
    });

    await expect(async () => {
      repository.updateTodos(id, item);
    }).rejects.toThrow('Todo with ID 2 does not exist.');
  });

  it('should return an error when trying to delete a non existent element in the todo list', async () => {
    const id = 2;


    (repository.deleteTodos as jest.Mock).mockImplementation(() => {
      throw new Error(`Todo with ID ${id} cannot be deleted.`);
    });

    await expect(async () => {
      repository.deleteTodos(id);
    }).rejects.toThrow(`Todo with ID 2 cannot be deleted.`);
  });

  it('should return an error when the user cannot retrieve the todolist', async () => {
    (repository.getTodos as jest.Mock).mockImplementation(() => {
      throw new Error('Unable to retrieve todolist');
    });

    await expect(async () => {
      repository.getTodos();
    }).rejects.toThrow('Unable to retrieve todolist');
  });

  it('should return an error when user cannot add to the todolist', async () => {
    const items = {
      todos: [
        {
          id: 3,
          task: 'This todo cannot be added',
        },
      ],
    };
    (repository.addTodo as jest.Mock).mockImplementation(() => {
      throw new Error('Unable to add to todolist');
    });

    await expect(async () => {
      repository.addTodo(items);
    }).rejects.toThrow('Unable to add to todolist');
  });
});
