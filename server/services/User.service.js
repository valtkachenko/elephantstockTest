const UserModel = require("../models/User.model")

class UserService {
  getAll = (filter) => {
    const searchString = filter ? filter.searchString : '';
    const role = filter ? filter.role : '';
    return UserModel.find(
      {
        ...(searchString && {
          $or: [
            { firstName: {$regex: searchString, $options: "i"}},
            { lastName: {$regex: searchString, $options: "i"}},
            { role: {$regex: searchString, $options: 'i'}},
            { email: {$regex: searchString, $options: "i"}},
          ]
         }),
        ...(role && {role})
      }
    );
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
  exists = (args) => UserModel.exists(args);
  find = args => UserModel.find(args);
}

module.exports = UserService;
