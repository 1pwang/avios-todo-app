import express from 'express';
import { TodoGetController } from '../controllers/todo/todo-get.controller';
import { TodoCreateController } from '../controllers/todo/todo-create.controller';
import { TodoUpdateController } from '../controllers/todo/todo-update.controller';
import { TodoUpdateStatusController } from '../controllers/todo/todo-update-status.controller';
import { TodoDeleteController } from '../controllers/todo/todo-delete.controller';

const router = express.Router();
const todoGetController = new TodoGetController();
const todoCreateController = new TodoCreateController();
const todoUpdateController = new TodoUpdateController();
const todoUpdateStatusController = new TodoUpdateStatusController();
const todoDeleteController = new TodoDeleteController();

router.get('/getTask', todoGetController.getTask);
router.post('/addTask', todoCreateController.addTask);
router.put('/updateTask/:id', todoUpdateController.updateTask);
router.put('/updateTaskStatus/:id', todoUpdateStatusController.updateStatusTask);
router.delete('/deleteTask/:id', todoDeleteController.deleteTask);


export default router;
