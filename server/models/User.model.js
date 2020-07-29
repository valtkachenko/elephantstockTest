const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
});

userSchema.index({'$**': 'text'});

const UserModel = model('User', userSchema);
module.exports = UserModel;
