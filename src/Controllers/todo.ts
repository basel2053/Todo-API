import { Request, Response } from 'express';
import Todo, { ITodo } from '../Models/todo';
import assignNotification from '../Utilities/assignNotification';
import cancelNotification from '../Utilities/cancelNotification';

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
		if (endDate) {
			assignNotification(
				todo._id.toString(),
				new Date(endDate),
				title,
				res.locals.userId,
				false
			);
		}
		res.status(200).json({ msg: 'todo created sucessfully!', id: todo._id });
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
			cancelNotification(todo._id.toString());
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
			if (req.body.endDate) {
				assignNotification(
					todo._id.toString(),
					new Date(req.body.endDate),
					req.body.title,
					res.locals.userId,
					true
				);
			}
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
		let todosCount: number | { count: number }[];
		const { date } = req.body;
		if (date) {
			todosCount = await Todo.aggregate([
				{
					$project: {
						month: { $month: '$endDate' },
						day: { $dayOfMonth: '$endDate' },
					},
				},
				{
					$match: {
						day: new Date(date).getDate(),
						month: new Date(date).getMonth() + 1,
					},
				},
				{
					$count: 'count',
				},
			]);

			todos = await Todo.aggregate([
				{
					$project: {
						month: { $month: '$endDate' },
						day: { $dayOfMonth: '$endDate' },
						_id: 1,
						title: 1,
						status: 1,
						endDate: 1,
					},
				},
				{
					$match: {
						day: new Date(date).getDate(),
						month: new Date(date).getMonth() + 1,
					},
				},
				{
					$skip: (page - 1) * todosPerPage,
				},
				{
					$limit: todosPerPage,
				},
				{
					$project: {
						day: 0,
						month: 0,
					},
				},
			]);

			todosCount = todosCount.length > 0 ? todosCount[0].count : 0;
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

// IMPORTANT  For dev only
export const getTodosDev = async (_req: Request, res: Response) => {
	try {
		const todos = await Todo.find();
		res.status(200).json(todos);
	} catch (err) {
		res.status(500).json(err);
	}
};
