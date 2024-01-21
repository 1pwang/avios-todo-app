import app from '../../../src/server';
import request from 'supertest';
import { Express } from 'express';
import { TaskStatus } from '../../../src/enums/task-status';
import { TodoService } from '../../../src/service/todo';

const expressApp = () => {
  return app;
};

describe('Todo-get Controller', () => {

  let app: Express;

  beforeAll(() => {
    app = expressApp();
  });

  it('/api/getTask (GET) - 200 Successful', async () => {

    const expected = {
      todos: [
        {
          id: 1,
          task: 'This is a todo example',
          status: TaskStatus.Incomplete
        }
      ]

    };

    const response = await request(app).get('/api/getTask');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
  });

  it('/api/getTask (GET) - 500 Internal Server Error', async () => {
    const body = {
      todos: [
        {
          id: 2,
          task: 'This is another task',
          status: TaskStatus.Incomplete
        }
      ]
    };

    TodoService.prototype.getTodos = jest.fn().mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const response = await request(app)
    .get('/api/getTask')
    .send(body);
    expect(response.status).toBe(500);
  });
});
