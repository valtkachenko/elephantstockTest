const UserService = require("../services/User.service")

const usersService = new UserService();
class UserController {
  getAll = async (req, res) => {
    try {
      // const data = await fs.promises.readFile(path.resolve(__dirname, '../users.json'));
      const users = await usersService.getAll();
      // const users = JSON.parse(data);
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  create = async (req, res) => {
    try {
      console.log(req.body);
      const valid = true;
      if (valid) {
        const result = await usersService.create(req.body);
        console.log(result);
      }
      // const data = await fs.promises.readFile(path.resolve(__dirname, '../users.json'));
      // const users = JSON.parse(data);
      res.json({});
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  update = async (req, res) => {
    try {
      console.log(req.body);
      const valid = true;
      if (valid) {
        const result = await usersService.update(req.body);
        console.log('Update result', result);
      }
      // const data = await fs.promises.readFile(path.resolve(__dirname, '../users.json'));
      // const users = JSON.parse(data);
      res.json(req.body);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  delete = async (req, res) => {
    try {

      const result = await usersService.delete(req.params.id);
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = UserController;
