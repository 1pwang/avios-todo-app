import app from '../../../src/server';
import request from 'supertest';
import { Express } from 'express';
import { TaskStatus } from '../../../src/enums/task-status';
import { TodoService } from '../../../src/service/todo';

const expressApp = () => {
  return app;
};

describe('Todo Controller', () => {

  let app: Express;

  beforeAll(() => {
    app = expressApp();
  });

  describe('getTodo', () => {
    it('/api/getTodo (GET) - 200 Successful', async () => {

      const expected = {
        todos: [
          {
            id: 1,
            task: 'This is a todo example',
            status: TaskStatus.Incomplete
          }
        ]

      };

      const response = await request(app).get('/api/todo');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected);
    });

    it('/api/getTodo (GET) - 500 Internal Server Error', async () => {
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
      .post('/api/todo')
      .send(body);
      expect(response.status).toBe(500);
    });

  });

  describe('addTodo', () => {
    it('/api/addTodo (POST) - 200 Successful', async () => {

      const body = {
        todos: [
          {
            id: 2,
            task: 'This is another task',
            status: TaskStatus.Incomplete
          }
        ]
      };

      const response = await request(app)
      .post('/api/addTask')
      .send(body);
      expect(response.status).toBe(200);
    });

    it('/api/addTodo (POST) - 422 Unprocessable entity', async () => {
      const body = {
        todos: [
          {
            id: 2,
            task: '',
            status: TaskStatus.Incomplete
          }
        ]
      };

      TodoService.prototype.addTodo = jest.fn().mockImplementation(() => {
        throw new Error('Unprocessable entity');
      });

      const response = await request(app)
      .post('/api/addTask')
      .send(body);
      expect(response.status).toBe(422);
    });

    it('/api/addTodo (POST) - 500 Internal Server Error', async () => {
      const body = {
        todos: [
          {
            id: 2,
            task: 'This is another task',
            status: TaskStatus.Incomplete
          }
        ]
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


  describe('updateTodo', async () => {
    it('/api/updateTodo/:id (PUT) - 200 Successful', async () => {
      const id = 1;
      const body = 'This is an updated task';

      const response = await request(app)
      .post(`/api/updateTodo/${id}`)
      .send(body);
      expect(response.status).toBe(200);
    });

    it('/api/updateTodo/:id (PUT) - 422 Unprocessable entity', async () => {
      const id = 1;
      const body = '';

      TodoService.prototype.updateTodo = jest.fn().mockImplementation(() => {
        throw new Error('Unprocessable entity');
      });

      const response = await request(app)
      .put(`/api/updateTodo/${id}`)
      .send(body);
      expect(response.status).toBe(422);

    });
    it('/api/updateTodo/:id (PUT) - 500 Internal Server Error', async () => {
      const id = 1;
      const body = 'This is an updated task';

      TodoService.prototype.updateTodo = jest.fn().mockImplementation(() => {
        throw new Error('Internal server error');
      });

      const response = await request(app)
      .post(`/api/updateTodo/${id}`)
      .send(body);
      expect(response.status).toBe(500);
    });
  });


  describe('deleteTodo', async () => {
    it('/api/deleteTodo/:id (DELETE) - 200 Successful', async () => {
      const id = 1;

      const response = await request(app)
      .delete(`/api/updateTodo/${id}`);
      expect(response.status).toBe(200);
    });
    it('/api/deleteTodo/:id (DELETE) - 500 Internal Server Error', async () => {
      const id = 1;

      TodoService.prototype.deleteTodo = jest.fn().mockImplementation(() => {
        throw new Error('Internal server error');
      });

      const response = await request(app)
      .delete(`/api/updateTodo/${id}`);
      expect(response.status).toBe(500);
    });

  });

  describe('updateTaskStatus', async () => {
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

});
