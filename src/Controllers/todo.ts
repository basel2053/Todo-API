import { Request, Response } from 'express';
import Todo, { ITodo } from '../Models/todo';

const todosPerPage = 6;

export const getAllTodos = async (_req: Request, res: Response) => {
	try {
		const todos = await Todo.find({ userId: res.locals.userId });
		res.status(200).json({ todos });
	} catch (err) {
		res.status(500).json(err);
	}
};

export const getTodos = async (req: Request, res: Response) => {
	try {
		const page = Number(req.query.page) || 1;
		const todos = await Todo.find({ userId: res.locals.userId })
			.skip((page - 1) * todosPerPage)
			.limit(todosPerPage);
		const todosCount = await Todo.find({
			userId: res.locals.userId,
		}).countDocuments();
		res.status(200).json({ todos, todosCount, page });
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
			endDate: endDate ? endDate : undefined,
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
		const userId = res.locals.userId;
		const { todoId } = req.body;
		const todo = await Todo.findById(todoId);
		if (todo && todo.userId == userId) {
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
		const userId = res.locals.userId;
		const { todoId } = req.body;
		const todo = await Todo.findById(todoId);
		if (todo && todo.userId == userId) {
			await Todo.findByIdAndUpdate(todoId, { $set: req.body });
			res.status(200).json('todo is updated sucessfully!');
		} else {
			res.status(404).json('there is no such a todo');
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

export const search = async (req: Request, res: Response) => {
	try {
		const page = Number(req.query.page) || 1;
		const { status } = req.query;
		let todos: ITodo[];
		let todosCount: number;
		const { date } = req.body;
		if (date) {
			todosCount = await Todo.find({
				status: status,
			}).countDocuments();
			todos = await Todo.find({ status: status })
				.skip((page - 1) * todosPerPage)
				.limit(todosPerPage);
		} else if (status) {
			todosCount = await Todo.find({
				status: status,
			}).countDocuments();
			todos = await Todo.find({ status: status })
				.skip((page - 1) * todosPerPage)
				.limit(todosPerPage);
		} else {
			const { query } = req.body;
			todosCount = await Todo.find({
				title: { $regex: query, $options: 'i' },
			}).countDocuments();
			todos = await Todo.find({ title: { $regex: query, $options: 'i' } })
				.skip((page - 1) * todosPerPage)
				.limit(todosPerPage);
		}
		res.status(200).json({ todos, todosCount, page });
	} catch (err) {
		res.status(500).json(err);
	}
};

export const dateSearch = async (req: Request, res: Response) => {
	try {
		const { date } = req.body;
		console.log(date);
		const todos = await Todo.find({ endDate: date });
		console.log(todos);
		res.json('hey');
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
