import app from '../../../src/server';
import request from 'supertest';
import { Express } from 'express';
import { TaskStatus } from '../../../src/enums/task-status';
import { TodoService } from '../../../src/service/todo';

const expressApp = () => {
  return app;
};

describe('Todo-update-status Controller', () => {

  let app: Express;

  beforeAll(() => {
    app = expressApp();
  });

  it('/api/updateTaskStatus/:id (PUT) - 200 Successful', async () => {

    const body = TaskStatus.Completed;
    const id = 1;

    const response = await request(app)
    .put(`/api/updateTaskStatus/${id}`)
    .send(body);
    expect(response.status).toBe(200);
  });

  it('/api/updateTaskStatus/:id (PUT) - 500 Internal Server Error', async () => {


    const body = TaskStatus.Completed;
    const id = 1;

    TodoService.prototype.updateTaskStatus = jest.fn().mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const response = await request(app)
    .put(`/api/updateTaskStatus/${id}`)
    .send(body);
    expect(response.status).toBe(500);
  });
});
