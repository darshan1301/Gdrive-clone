const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Country: { type: String, required: true },
  State: { type: String, required: true },
  City: { type: String, required: true },
  Password: { type: String, required: true },
  //AssignedStorage: { type: String, required: true, unique: true},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
