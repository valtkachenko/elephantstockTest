const { Router } = require('express');
const usersRouter = require('./users');

const rootRouter = Router();

rootRouter.use('/users', usersRouter);

module.exports = rootRouter;
