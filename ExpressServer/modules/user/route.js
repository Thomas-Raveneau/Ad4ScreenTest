import express from 'express';
import controller from './controller.js';

const router = express.Router();

router.post('/', controller.createUser);

router.get('/:page', controller.getUsers);

router.put('/:id', controller.updateUser);

router.delete('/:id', controller.deleteUser);


export default router;