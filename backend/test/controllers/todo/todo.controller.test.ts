import express from 'express';
import server from '../../../src/server';
import request from 'supertest';
import { TaskStatus } from '../../../src/enums/task-status';

describe('Todo Controller', () => {

  let app: express.Application = express();

  beforeAll(() => {
    app = server();
  });

  describe('getTodo', () => {
    it('/api/getTodo (GET) - 200 Successful', async () => {
      const response = await request(app).get('/api/todo');
      expect(response.status).toBe(200);
    });

    it('/api/getTodo (GET) - 500 Internal Server Error', async () => {
      const response = await request(app).get('/api/todo');
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

      const response = await request(app)
      .post('/api/addTask')
      .send(body);
      expect(response.status).toBe(200);
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

      const response = await request(app)
      .post('/api/addTask')
      .send(body);
      expect(response.status).toBe(500);
    });
  });

  //
  // describe('updateTodo', async () => {
  //   it('/api/updateTodo/:id (PUT) - 200 Successful', async () => {
  //     const id = 1;
  //     const body = 'This is an updated task';
  //
  //     const response = await request(app)
  //     .post(`/api/updateTodo/${id}`)
  //     .send(body);
  //     expect(response.status).toBe(200);
  //   });
  //
  //   it('/api/updateTodo/:id (PUT) - 422 Unprocessable entity', async () => {
  //     const id = 1;
  //     const body = '';
  //
  //     const response = await request(app)
  //     .put(`/api/updateTodo/${id}`)
  //     .send(body);
  //     expect(response.status).toBe(422);
  //
  //   });
  //   it('/api/updateTodo/:id (PUT) - 500 Internal Server Error', async () => {
  //     const id = 1;
  //     const body = 'This is an updated task';
  //
  //     const response = await request(app)
  //     .post(`/api/updateTodo/${id}`)
  //     .send(body);
  //     expect(response.status).toBe(500);
  //   });
  // });
  //
  //
  // describe('deleteTodo', async () => {
  //   it('/api/deleteTodo/:id (DELETE) - 200 Successful', async () => {
  //     const id = 1;
  //
  //     const response = await request(app)
  //     .delete(`/api/updateTodo/${id}`);
  //     expect(response.status).toBe(200);
  //   });
  //   it('/api/deleteTodo/:id (DELETE) - 500 Internal Server Error', async () => {
  //     const id = 1;
  //
  //     const response = await request(app)
  //     .delete(`/api/updateTodo/${id}`);
  //     expect(response.status).toBe(500);
  //   });
  //
  // });
  //
  // describe('updateTaskStatus', async () => {
  //   it('/api/updateTaskStatus/:id (PUT) - 200 Successful', async () => {
  //
  //     const body = TaskStatus.Completed;
  //     const id = 1;
  //
  //     const response = await request(app)
  //     .put(`/api/updateTaskStatus/${id}`)
  //     .send(body);
  //     expect(response.status).toBe(200);
  //   });
  //
  //   it('/api/updateTaskStatus/:id (PUT) - 500 Internal Server Error', async () => {
  //
  //
  //     const body = TaskStatus.Completed;
  //     const id = 1;
  //
  //     const response = await request(app)
  //     .put(`/api/updateTaskStatus/${id}`)
  //     .send(body);
  //     expect(response.status).toBe(500);
  //   });
  // });

});
