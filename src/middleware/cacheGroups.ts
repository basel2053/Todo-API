import { NextFunction, Request, Response } from 'express';
import { redisClient } from '../app';

const cacheGroups = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const cachedGroups = await redisClient.get(res.locals.userId);
		if (cachedGroups) {
			res
				.status(200)
				.json({ fromCache: true, groups: JSON.parse(cachedGroups) });
		} else {
			next();
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

export default cacheGroups;
