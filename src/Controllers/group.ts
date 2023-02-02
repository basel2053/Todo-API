import Group from '../Models/group';
import { Request, Response } from 'express';

// const colors = [];

export const getGroups = async (_req: Request, res: Response) => {
	try {
		const groups = await Group.find({ userId: res.locals.userId });
		res.status(200).json(groups);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const createGroup = async (req: Request, res: Response) => {
	try {
		const { name, todos }: { name: string; todos: string[] } = req.body;
		console.log(name);
		console.log(todos);
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
