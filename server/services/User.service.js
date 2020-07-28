const UserModel = require("../models/User.model")

class UserService {
  getAll = (filter) => {
    return UserModel.find();
  }

  update = ({ _id, ...user }) => {
    return UserModel.updateOne(user);
  }

  create = (user) => {
    return UserModel.create(user);
  }

  delete = (id) => {
    return UserModel.deleteOne({_id: id});
  }
}

module.exports = UserService;
