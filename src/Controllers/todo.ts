import { Request, Response } from 'express';
import Todo from '../Models/todo';

export const getTodos = async (req: Request, res: Response) => {
	try {
		const todos = await Todo.find({ userId: req.params.id });
		res.status(200).json(todos);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const createTodo = async (req: Request, res: Response) => {
	try {
		const { title, status, endDate } = req.body;
		const todo = new Todo({
			title,
			status,
			endDate,
			userId: res.locals.userId,
		});
		await todo.save();
		res.status(200).json('todo is created sucessfully!');
	} catch (err) {
		res.status(500).json(err);
	}
};

export const deleteTodo = async (req: Request, res: Response) => {
	try {
		const { todoId } = req.body;
		const todo = await Todo.findById(todoId);
		if (todo && todo.userId == req.params.id) {
			await Todo.findByIdAndDelete(todoId);
			res.status(200).json('todo is deleted sucessfully!');
		} else {
			res.status(404).json('there is no such a todo');
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
export const updateTodo = async (req: Request, res: Response) => {
	try {
		const { todoId } = req.body;
		const todo = await Todo.findById(todoId);
		if (todo && todo.userId == req.params.id) {
			await Todo.findByIdAndUpdate(todoId, {});
			res.status(200).json('todo is updated sucessfully!');
		} else {
			res.status(404).json('there is no such a todo');
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

// IMPORTANT  For dev only
export const getTodosDev = async (_req: Request, res: Response) => {
	try {
		const todos = await Todo.find();
		res.status(200).json(todos);
	} catch (err) {
		res.status(500).json(err);
	}
};
