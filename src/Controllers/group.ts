import Group from '../Models/group';
import { Request, Response } from 'express';
import { redisClient } from '../app';

export const getGroups = async (_req: Request, res: Response) => {
	try {
		const groups = await Group.find({ userId: res.locals.userId }).populate(
			'todos'
		);
		await redisClient.set(res.locals.userId, JSON.stringify(groups), {
			EX: 30,
			NX: true,
		}); // NOTE  30 second for testing purpose
		res.status(200).json({ fromCache: false, groups });
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
		res.status(200).json({ msg: 'group created sucessfully!', id: group._id });
	} catch (err) {
		res.status(500).json(err);
	}
};

export const deleteGroup = async (req: Request, res: Response) => {
	try {
		const userId = res.locals.userId;
		const { groupId } = req.body;
		const group = await Group.findById(groupId);

		if (group && group.userId == userId) {
			await Group.findByIdAndDelete(groupId);
			res.status(200).json('group is deleted sucessfully!');
		} else {
			res.status(404).json('there is no such group');
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

export const updateGroup = async (req: Request, res: Response) => {
	try {
		const userId = res.locals.userId;
		const { groupId } = req.body;
		const group = await Group.findById(groupId);
		if (group && group.userId == userId) {
			await Group.findByIdAndUpdate(groupId, { $set: req.body });
			res.status(200).json('group is updated sucessfully!');
		} else {
			res.status(404).json('there is no such group');
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
