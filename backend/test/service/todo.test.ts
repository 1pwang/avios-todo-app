import { TodoService } from '../../src/service/todo';
import { TodoRepository } from '../../src/repository/todo';
import { mock } from 'jest-mock-extended';

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
    };
    const id = 1;

    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is an updated todo',
        }
      ],
    };


    await todoRepositoryMock.updateTodos.mockReturnValue(expected);

    const actual = await sut.updateTodo(id, item);
    expect(actual).toEqual(expected);
  });


  it('should return an error when the task has more than 50 characters', async () => {
    const longTask = 'a'.repeat(51);
    const item = {
      id: 4,
      task: longTask,
    };

    await expect(sut.addTodo(item)).rejects.toThrow('A task cannot have more than 50 characters');
  });


  it('should return an error when user has entered an empty task', async () => {
    const items = {
      id: 3,
      task: '',
    };

    await expect(sut.addTodo(items)).rejects.toThrow('You must type in a todo');
  });

  it('should return an error when user tried to update with an empty task', async () => {
    const id = 3;

    const items = {
      id: 3,
      task: '',
    };

    await expect(sut.updateTodo(id, items)).rejects.toThrow('You must have a task');
  });
});
