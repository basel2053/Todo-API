import Group from '../Models/group';
import { Request, Response } from 'express';

export const getGroups = async (_req: Request, res: Response) => {
	try {
		const groups = await Group.find({ userId: res.locals.userId }).populate(
			'todos'
		);
		res.status(200).json(groups);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const createGroup = async (req: Request, res: Response) => {
	try {
		const {
			name,
			todos,
			color,
		}: { name: string; color: number; todos: string[] } = req.body;
		const group = new Group({ name, color, todos, userId: res.locals.userId });
		await group.save();
		res.status(200).json('group created sucessfully!');
	} catch (err) {
		res.status(500).json(err);
	}
};

export const deleteGroup = async (req: Request, res: Response) => {
	try {
		console.log('hey delete');
	} catch (err) {
		res.status(500).json(err);
	}
};
export const updateGroup = async (req: Request, res: Response) => {
	try {
		console.log('hey update');
	} catch (err) {
		res.status(500).json(err);
	}
};
