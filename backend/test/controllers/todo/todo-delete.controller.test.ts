import app from '../../../src/server';
import request from 'supertest';
import { Express } from 'express';
import { TodoService } from '../../../src/service/todo';

const expressApp = () => {
  return app;
};

describe('Todo-delete Controller', () => {

  let app: Express;

  beforeAll(() => {
    app = expressApp();
  });

  it('/api/deleteTask/:id (DELETE) - 200 Successful', async () => {
    const id = 1;

    const response = await request(app)
    .delete(`/api/deleteTask/${id}`);
    expect(response.status).toBe(200);
  });

  it('/api/deleteTodo/:id (DELETE) - 500 Internal Server Error', async () => {
    const id = 1;

    TodoService.prototype.deleteTodo = jest.fn().mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const response = await request(app)
    .delete(`/api/deleteTask/${id}`);
    expect(response.status).toBe(500);
  });
});
