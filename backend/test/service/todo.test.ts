import { TodoService } from '../../src/service/todo';
import { TodoRepository } from '../../src/repository/todo';
import { mock } from 'jest-mock-extended';
import { TaskStatus } from '../../src/enums/task-status';

describe('TodoService', () => {
  let sut: TodoService;
  let todoRepositoryMock = mock<TodoRepository>();

  beforeEach(() => {
    jest.clearAllMocks();
    sut = new TodoService(todoRepositoryMock);
  });

  it('should return the todo list', async () => {
    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is a todo example',
          status: TaskStatus.Completed
        },
      ],
    };
    await todoRepositoryMock.getTodos.mockReturnValue(expected);

    const actual = await sut.getTodos();
    expect(actual).toEqual(expected);
  });

  it('should add to the todo list', async () => {
    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is a todo example',
          status: TaskStatus.Completed
        },
        {
          id: 2,
          task: 'This is another todo example',
          status: TaskStatus.Incomplete
        },
      ],
    };

    const item = {
      id: 2,
      task: 'This is another todo example',
      status: TaskStatus.Incomplete
    };

    await todoRepositoryMock.addTodo.mockReturnValue(expected);

    const actual = await sut.addTodo(item);
    expect(actual).toEqual(expected);
  });

  it('should delete from the todo list', async () => {
    const id = 1;

    const expected = {
      todos: [],
    };

    await todoRepositoryMock.deleteTodos.mockReturnValue(expected);

    const actual = await sut.deleteTodo(id);
    expect(actual).toEqual(expected);
  });

  it('should update the todo list', async () => {
    const item = {
      id: 1,
      task: 'This is an updated todo',
      status: TaskStatus.Completed
    };
    const id = 1;

    const expected = {
      id: 1,
      task: 'This is an updated todo',
      status: TaskStatus.Completed
    };


    await todoRepositoryMock.updateTodos.mockReturnValue(expected);

    const actual = await sut.updateTodo(id, item);
    expect(actual).toEqual(expected);
  });

  it('should update the status of a task be complete', async () => {
    const status = {
      status: TaskStatus.Completed
    };
    const id = 1;

    const expected =
      {
        id: 1,
        task: 'This is an incomplete task',
        status: TaskStatus.Completed
      };


    await todoRepositoryMock.updateTaskStatus.mockReturnValue(expected);

    const actual = await sut.updateTaskStatus(id, status);
    expect(actual).toEqual(expected);
  });

  it('should update the status of a task be incomplete', async () => {
    const item = {
      status: TaskStatus.Incomplete
    };
    const id = 1;

    const expected = {
      id: 1,
      task: 'This is an updated todo',
      status: TaskStatus.Incomplete
    };


    await todoRepositoryMock.updateTaskStatus.mockReturnValue(expected);

    const actual = await sut.updateTaskStatus(id, status);
    expect(actual).toEqual(expected);
  });

  it('should return an error when the task has more than 50 characters', async () => {
    const longTask = 'a'.repeat(51);
    const item = {
      id: 4,
      task: longTask,
      status: TaskStatus.Incomplete
    };

    await expect(sut.addTodo(item)).rejects.toThrow('A task cannot have more than 50 characters');
  });


  it('should return an error when user has entered an empty task', async () => {
    const items = {
      id: 3,
      task: '',
      status: TaskStatus.Incomplete
    };

    await expect(sut.addTodo(items)).rejects.toThrow('You must type in a todo');
  });

  it('should return an error when user tried to update with an empty task', async () => {
    const id = 3;

    const items = {
      id: 3,
      task: '',
      status: TaskStatus.Incomplete
    };

    await expect(sut.updateTodo(id, items)).rejects.toThrow('You must have a task');
  });

  it('should return an error when user tries to update the status of a task to be completed', async () => {
    const id = 3;

    const items = {
      id: 3,
      task: 'This is a completed task',
      status: TaskStatus.Completed
    };

    await expect(sut.updateTaskStatus(id, items)).rejects.toThrow('This task cannot be updated');
  });

  it('should return an error when user tries to update the status of a task to be incomplete', async () => {
    const id = 3;

    const items = {
      id: 3,
      task: 'This is a completed task',
      status: TaskStatus.Incomplete
    };

    await expect(sut.updateTaskStatus(id, items)).rejects.toThrow('This task cannot be updated');
  });
});
