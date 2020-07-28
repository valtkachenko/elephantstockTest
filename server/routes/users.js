const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const UserController = require('../controllers/User.controller');

const usersRouter = Router();
const userController = new UserController();

usersRouter.get('/', userController.getAll);
usersRouter.post('/', userController.create);
usersRouter.put('/:id', userController.update);
usersRouter.delete('/:id', userController.delete);

module.exports = usersRouter;
