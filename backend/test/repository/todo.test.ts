import * as todoRepository from '../../src/repository/todo';
import { TaskStatus } from '../../src/enums/task-status';

jest.mock('../../src/repository/todo', () => ({
  TodoRepository: jest.fn().mockImplementation(() => ({
    getTodos: jest.fn(),
    addTodo: jest.fn(),
    deleteTodos: jest.fn(),
    updateTodos: jest.fn(),
    updateTaskStatus: jest.fn()
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
          status: TaskStatus.Incomplete
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
          status: TaskStatus.Incomplete
        },
        {
          id: 2,
          task: 'This is another todo example',
          status: TaskStatus.Completed
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

  it('should persist changes to a task', async () => {

    const item = 'This is an updated todo';

    const id = 1;

    const expected = {
      id: 1,
      task: 'This is an updated todo',
      status: TaskStatus.Incomplete
    };

    (repository.updateTodos as jest.Mock).mockResolvedValue(expected);

    const actual = await repository.updateTodos(id, item);
    expect(actual).toEqual(expected);
  });

  it('should update the status of a task in the todolist', async () => {
    const taskStatus = TaskStatus.Completed;

    const id = 1;

    const expected = {
      id: 1,
      task: 'This is an updated todo',
      status: TaskStatus.Completed,
    };

    (repository.updateTaskStatus as jest.Mock).mockResolvedValue(expected);

    const actual = await repository.updateTaskStatus(id, taskStatus);
    expect(actual).toEqual(expected);
  });

  it('should return an error when trying to persist changes to a non existent task in the todo list', async () => {

    const item = 'This is a non existent todo';

    const id = 2;

    (repository.updateTodos as jest.Mock).mockImplementation(() => {
      throw new Error(`Todo with ID ${id} does not exist.`);
    });

    await expect(async () => {
      repository.updateTodos(id, item);
    }).rejects.toThrow('Todo with ID 2 does not exist.');
  });

  it('should return an error when trying to delete a non existent task in the todo list', async () => {
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
          status: TaskStatus.Incomplete
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

  it('should return an error when user cannot update the status of the task', async () => {
    const status = TaskStatus.Completed;


    const id = 1;

    (repository.updateTaskStatus as jest.Mock).mockImplementation(() => {
      throw new Error(`Unable to update status of task ${id}`);
    });

    await expect(async () => {
      repository.updateTaskStatus(id, status);
    }).rejects.toThrow(`Unable to update status of task ${id}`);
  });
});
