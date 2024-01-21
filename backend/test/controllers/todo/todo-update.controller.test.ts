import app from '../../../src/server';
import request from 'supertest';
import { Express } from 'express';
import { TodoService } from '../../../src/service/todo';

const expressApp = () => {
  return app;
};

describe('Todo-update Controller', () => {

  let app: Express;

  beforeAll(() => {
    app = expressApp();
  });

  it('/api/updateTask/:id (PUT) - 200 Successful', async () => {
    const id = 1;
    const body = {
      task: 'This is an updated task'
    };

    const response = await request(app)
    .put(`/api/updateTask/${id}`)
    .send(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({task: 'This is an updated task'});
  });

  it('/api/updateTask/:id (PUT) - 422 Unprocessable entity', async () => {
    const id = 1;
    const body = '';

    TodoService.prototype.updateTodo = jest.fn().mockImplementation(() => {
      throw new Error('Unprocessable entity');
    });

    const response = await request(app)
    .put(`/api/updateTask/${id}`)
    .send(body);
    expect(response.status).toBe(422);

  });
  it('/api/updateTask/:id (PUT) - 500 Internal Server Error', async () => {
    const id = 1;
    const body = {
      task: 'This is an updated task'
    };

    TodoService.prototype.updateTodo = jest.fn().mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const response = await request(app)
    .put(`/api/updateTask/${id}`)
    .send(body);
    expect(response.status).toBe(500);
  });
});
