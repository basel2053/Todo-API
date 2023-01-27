import { Router } from 'express';
import * as todoController from '../Controllers/todo';
import verifyToken from '../middleware/verifyToken';
import validateTodo from '../middleware/validateTodo';

const router = Router();

router.get('/', verifyToken, todoController.getTodos);

router.post('/', verifyToken, validateTodo, todoController.createTodo);

router.delete('/', verifyToken, todoController.deleteTodo);

router.patch('/', verifyToken, validateTodo, todoController.updateTodo);

router.post('/search', verifyToken, todoController.search);

// IMPORTANT  for development purpose only
router.get('/v1/dev', verifyToken, todoController.getTodosDev);

export default router;
