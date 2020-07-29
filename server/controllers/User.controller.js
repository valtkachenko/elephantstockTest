const UserService = require("../services/User.service");
const userValidationSchema = require("../models/User.validation");

const usersService = new UserService();
class UserController {
  getAll = async (req, res) => {
    try {
      const { query } = req;
      const users = await usersService.getAll(query);
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  create = async (req, res) => {
    try {
      const { value, error } = userValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const isEmailExists = await usersService.exists({email: value.email});
      if (isEmailExists) {
        return res.status(400).send('Email already exists');
      }

      if (value.role === 'Art manager') {
        const isArtManagerExists = await userService.exists({role: value.role});
        if (isArtManagerExists) {
          return res.status(400).send('Only 1 Art manager can be in table');
        }
      }

      const result = await usersService.create(value);
      return res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  update = async (req, res) => {
    try {
      const { value, error } = userValidationSchema.validate(req.body);

      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const isEmailExists = await usersService.exists({email: value.email, _id: {$ne: req.body._id}});
      if (isEmailExists) {
        return res.status(400).send('Email already exists');
      }

      if (value.role === 'Art manager') {
        const isArtManagerExists = await usersService.exists({role: value.role, _id: {$ne: req.body._id}});
        if (isArtManagerExists) {
          return res.status(400).send('Only 1 Art manager can be in table');
        }
      }
        const result = await usersService.update(req.body);

      return  res.json(req.body);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  delete = async (req, res) => {
    try {
      const result = await usersService.delete(req.params.id);
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = UserController;
