import { Router } from 'express';
import * as todoController from '../Controllers/todo';
import verifyToken from '../middleware/verifyToken';
import authToken from '../middleware/authorizeToken';
import validateTodo from '../middleware/validateTodo';

const router = Router();

router.get('/:id', authToken, todoController.getTodos);

router.post('/', verifyToken, validateTodo, todoController.createTodo);

router.delete('/:id', authToken, todoController.deleteTodo);

router.patch('/:id', authToken, validateTodo);

// IMPORTANT  for development purpose only
router.get('/v1/dev', verifyToken, todoController.getTodosDev);

export default router;
