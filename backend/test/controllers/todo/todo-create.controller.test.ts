import app from '../../../src/server';
import request from 'supertest';
import { Express } from 'express';
import { TaskStatus } from '../../../src/enums/task-status';
import { TodoService } from '../../../src/service/todo';

const expressApp = () => {
  return app;
};

describe('Todo-create Controller', () => {

  let app: Express;

  beforeAll(() => {
    app = expressApp();
  });

  it('/api/addTask (POST) - 200 Successful', async () => {

    const body =
      {
        id: 2,
        task: 'This is another task',
        status: TaskStatus.Incomplete
      };

    const response = await request(app)
    .post('/api/addTask')
    .send(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      {
        id: 2,
        task: 'This is another task',
        status: TaskStatus.Incomplete
      }
    );
  });

  it('/api/addTask (POST) - 422 Unprocessable entity', async () => {
    const body = {
      id: 2,
      task: '',
      status: TaskStatus.Incomplete
    };

    TodoService.prototype.addTodo = jest.fn().mockImplementation(() => {
      throw new Error('Unprocessable entity');
    });

    const response = await request(app)
    .post('/api/addTask')
    .send(body.task);
    expect(response.status).toBe(422);
  });

  it('/api/addTask (POST) - 500 Internal Server Error', async () => {
    const body =
      {
        id: 2,
        task: 'This is another task',
        status: TaskStatus.Incomplete
      };

    TodoService.prototype.addTodo = jest.fn().mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const response = await request(app)
    .post('/api/addTask')
    .send(body);
    expect(response.status).toBe(500);
  });
});
