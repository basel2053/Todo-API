import { Router } from 'express';
import * as groupsController from '../Controllers/group';
import verifyToken from '../middleware/verifyToken';
import validateGroup from '../middleware/validateGroup';
import cacheGroups from '../middleware/cacheGroups';

const router = Router();

router.get('/', verifyToken, cacheGroups, groupsController.getGroups);

router.post('/', verifyToken, validateGroup, groupsController.createGroup);

router.delete('/', verifyToken, groupsController.deleteGroup);

router.patch('/', verifyToken, validateGroup, groupsController.updateGroup);

export default router;
